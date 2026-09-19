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
 * CREATED DATE : September 17, 2026 07:25 PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Service layer handling business logic and query execution
 * for lookup management.
 * ------------------------------------------------------------------------
 */

'use strict';

const crypto = require('crypto');
const { Op } = require('sequelize');
const Lookup = require('./lookup.model');

class LookupService {

  /**
   * Create a new lookup record
   */
  async createLookup(payload) {
    const lookupData = {
      ...payload,
      juid: payload.juid || crypto.randomUUID()
    };

    const newLookup = await Lookup.create(lookupData);
    return newLookup;
  }

  /**
   * Fetch paginated lookup records matching search & sorting requirements
   */
  async getPaginatedLookups(params = {}) {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'id',
      sortOrder = 'DESC'
    } = params;

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    const whereClause = {
      deleted: 0
    };

    if (search && search.trim() !== '') {
      const query = `%${search.trim()}%`;
      whereClause[Op.or] = [
        { entityid: { [Op.iLike]: query } },
        { appid: { [Op.iLike]: query } },
        { keyid: { [Op.iLike]: query } },
        { itemid: { [Op.iLike]: query } },
        { description: { [Op.iLike]: query } },
        { city: { [Op.iLike]: query } },
        { sstatus: { [Op.iLike]: query } }
      ];
    }

    const { count, rows } = await Lookup.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit, 10),
      offset: parseInt(offset, 10),
      order: [[sortBy, sortOrder.toUpperCase()]]
    });

    return {
      totalRecords: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      data: rows
    };
  }

  /**
   * Fetch single lookup by ID
   */
  async getLookupById(id) {
    return await Lookup.findOne({
      where: { id, deleted: 0 }
    });
  }

  /**
   * Update an existing lookup record by ID
   */
  async updateLookup(id, payload) {
    const lookup = await this.getLookupById(id);

    if (!lookup) {
      throw new Error('Lookup record not found');
    }

    await lookup.update(payload);
    return lookup;
  }

  /**
   * Soft delete a lookup record by setting deleted flag to 1
   */
  async deleteLookup(id) {
    const lookup = await this.getLookupById(id);

    if (!lookup) {
      throw new Error('Lookup record not found');
    }

    await lookup.update({ deleted: 1 });
    return true;
  }
}

module.exports = LookupService;