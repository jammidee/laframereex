/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : September 11, 2026 03:12 AM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Controller routing incoming HTTP requests to ConfigService.
 * ------------------------------------------------------------------------
 */

class ConfigDBController {
  constructor(configService) {
    this.configService = configService;
    this.getConfig     = this.getConfig.bind(this);
    this.setConfig     = this.setConfig.bind(this);
    this.deleteConfig  = this.deleteConfig.bind(this);
    this.clearCache    = this.clearCache.bind(this);
  }

  /**
   * Fetch configuration value by key
   */
  async getConfig(req, res) {
    try {
      const { key } = req.params;
      const { entityid, defaultValue, autoCreate, ttl } = req.query;

      const data = await this.configService.get(key, {
        entityid,
        defaultValue: defaultValue !== undefined ? defaultValue : null,
        autoCreate: autoCreate === 'true' || autoCreate === true,
        ttl: ttl ? parseInt(ttl, 10) : undefined
      });

      if (data === null) {
        return res.status(404).json({
          success: false,
          message: 'Configuration key not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Configuration retrieved successfully',
        data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch configuration'
      });
    }
  }

  /**
   * Create or update a configuration entry
   */
  async setConfig(req, res) {
    try {
      const { key, value, entityid, description, var_type, ttl } = req.body;
      const userid = req.user ? req.user.id : 0;

      if (!key || value === undefined) {
        return res.status(400).json({
          success: false,
          message: 'Key and value are required fields'
        });
      }

      await this.configService.set(key, value, {
        entityid,
        description,
        var_type,
        userid,
        ttl: ttl ? parseInt(ttl, 10) : undefined
      });

      return res.status(200).json({
        success: true,
        message: 'Configuration saved successfully'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to save configuration'
      });
    }
  }

  /**
   * Delete a configuration entry
   */
  async deleteConfig(req, res) {
    try {
      const { key } = req.params;
      const { entityid } = req.query;

      await this.configService.delete(key, entityid);

      return res.status(200).json({
        success: true,
        message: 'Configuration deleted successfully'
      });
    } catch (error) {
      if (error.message === 'Configuration not found') {
        return res.status(404).json({
          success: false,
          message: error.message
        });
      }

      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete configuration'
      });
    }
  }

  /**
   * Clear in-memory cache manually
   */
  async clearCache(req, res) {
    try {
      this.configService.clearCache();

      return res.status(200).json({
        success: true,
        message: 'Configuration cache cleared successfully'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to clear configuration cache'
      });
    }
  }
}

module.exports = ConfigDBController;