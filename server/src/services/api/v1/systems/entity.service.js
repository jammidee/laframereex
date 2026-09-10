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
 * CREATED DATE : August 23, 2026
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Service layer handling business logic and query execution
 * for entity management.
 * ------------------------------------------------------------------------
 */

'use strict';

const { Op } = require('sequelize');
const Entity = require('../../../../models/systems/entity.model');

class EntityService {

  /**
   * Create a new entity record
   */
    async createEntity(payload) {
        const entityData = {
        ...payload,
        juid: payload.juid || crypto.randomUUID()
        };

        const newEntity = await Entity.create(entityData);
        return newEntity;
    }

  /**
   * Fetch paginated entity records matching DataTable search & sorting requirements
   */
  async getPaginatedEntities(params = {}) {
    const {
      page = 1,
      limit = 10,
      search = '',
      sortBy = 'created_at',
      sortOrder = 'DESC'
    } = params;

    const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

    // Build search predicate
    const whereClause = {
      is_deleted: 0
    };

    if (search && search.trim() !== '') {
      const query = `%${search.trim()}%`;
      whereClause[Op.or] = [
        { display_id: { [Op.iLike]: query } },
        { name: { [Op.iLike]: query } },
        { city: { [Op.iLike]: query } },
        { status: { [Op.iLike]: query } }
      ];
    }

    // Execute query with count
    const { count, rows } = await Entity.findAndCountAll({
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
   * Fetch single entity by ID
   */
  async getEntityById(id) {
    return await Entity.findOne({
      where: { id, is_deleted: 0 }
    });
  }

  /**
   * Update an existing entity record by ID
   */
  async updateEntity(id, payload) {
    const entity = await this.getEntityById(id);

    if (!entity) {
      throw new Error('Entity record not found');
    }

    await entity.update(payload);
    return entity;
  }

  /**
   * Soft delete an entity record by setting is_deleted flag to 1
   */
  async deleteEntity(id) {
    const entity = await this.getEntityById(id);

    if (!entity) {
      throw new Error('Entity record not found');
    }

    await entity.update({ is_deleted: 1 });
    return true;
  }
}

module.exports = EntityService;