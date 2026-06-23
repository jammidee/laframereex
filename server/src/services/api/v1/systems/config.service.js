/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso)
 * This file is part of the Lalulla System.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : April 09, 2026 05:03 PM
 * ------------------------------------------------------------------------
 */

'use strict';

const Config = require('../../../../models/systems/configdb.model');

/**
 * ConfigService
 * Handles configuration database logic only.
 * Includes in-memory caching for performance.
 * No HTTP logic here.
 */
class ConfigService {

  constructor() {

    /**
     * ----------------------------------------------------------
     * In-memory cache storage
     * Key format: entityid:key
     * Value: { value, expiry }
     * ----------------------------------------------------------
     */
    this.cache = new Map();

    /**
     * Default TTL (milliseconds) – 5 minutes
     */
    this.defaultTTL = 5 * 60 * 1000;
  }

  /**
   * Build cache key
   */
  _buildCacheKey(key, entityid) {
    return `${entityid}:${key}`;
  }

  /**
   * ----------------------------------------------------------
   * Get configuration value (with cache support)
   * ----------------------------------------------------------
   */
  async get(key, options = {}) {

    const {
      entityid = 'LALULLA',
      defaultValue = null,
      autoCreate = false,
      ttl = this.defaultTTL
    } = options;

    const cacheKey = this._buildCacheKey(key, entityid);

    /**
     * 1️⃣ Check memory cache first
     */
    const cached = this.cache.get(cacheKey);

    if (cached) {

      if (!cached.expiry || cached.expiry > Date.now()) {
        return cached.value;
      }

      // Expired → remove
      this.cache.delete(cacheKey);
    }

    /**
     * 2️⃣ Fetch from DB
     */
    const record = await Config.findOne({
      where: {
        var_key: key,
        entityid,
        status: 'active',
        deleted: 0
      }
    });

    if (record) {

      const parsedValue = this._parseValue(
        record.var_value,
        record.var_type
      );

      /**
       * Store in cache
       */
      this.cache.set(cacheKey, {
        value: parsedValue,
        expiry: ttl ? Date.now() + ttl : null
      });

      return parsedValue;
    }

    /**
     * 3️⃣ Handle default fallback
     */
    if (defaultValue !== null) {

      if (autoCreate) {

        await this.set(key, defaultValue, {
          entityid,
          description: 'Auto-created default value',
          var_type: typeof defaultValue
        });
      }

      return defaultValue;
    }

    return null;
  }

  /**
   * ----------------------------------------------------------
   * Set or update configuration
   * (Write-through cache update)
   * ----------------------------------------------------------
   */
  async set(key, value, options = {}) {

    const {
      entityid = '_NA_',
      description = null,
      var_type = typeof value,
      userid = 0,
      ttl = this.defaultTTL
    } = options;

    const cacheKey = this._buildCacheKey(key, entityid);

    const existing = await Config.findOne({
      where: { var_key: key, entityid }
    });

    if (existing) {

      existing.var_value   = this._stringifyValue(value);
      existing.var_type    = var_type;
      existing.description = description;
      existing.updated_by  = userid;

      await existing.save();

    } else {

      await Config.create({
        entityid,
        var_key: key,
        var_value: this._stringifyValue(value),
        var_type,
        description,
        userid,
        created_by: userid
      });
    }

    /**
     * Update cache immediately
     */
    this.cache.set(cacheKey, {
      value,
      expiry: ttl ? Date.now() + ttl : null
    });

    return true;
  }

  /**
   * ----------------------------------------------------------
   * Soft delete configuration
   * (Invalidate cache)
   * ----------------------------------------------------------
   */
  async delete(key, entityid = '_NA_') {

    const cacheKey = this._buildCacheKey(key, entityid);

    const record = await Config.findOne({
      where: { var_key: key, entityid }
    });

    if (!record) {
      throw new Error('Configuration not found');
    }

    record.deleted = 1;
    record.status  = 'archived';

    await record.save();

    /**
     * Remove from cache
     */
    this.cache.delete(cacheKey);

    return true;
  }

  /**
   * Optional: Clear entire cache manually
   */
  clearCache() {
    this.cache.clear();
  }

  /**
   * Convert DB string to correct type
   */
  _parseValue(value, type) {

    switch (type) {

      case 'int':
      case 'number':
        return parseInt(value);

      case 'float':
        return parseFloat(value);

      case 'bool':
      case 'boolean':
        return value === 'true' || value === true;

      case 'json':
      case 'object':
        try {
          return JSON.parse(value);
        } catch {
          return null;
        }

      default:
        return value;
    }
  }

  /**
   * Convert value to storable string
   */
  _stringifyValue(value) {

    if (typeof value === 'object') {
      return JSON.stringify(value);
    }

    return String(value);
  }

}

module.exports = ConfigService;   // Export class (NOT instance)