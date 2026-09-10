/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : August 23, 2026 04:21 PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Controller routing incoming HTTP requests to EntityService.
 * ------------------------------------------------------------------------
 */

class EntityController {
  constructor(entityService) {
    this.entityService = entityService;
    this.createEntity  = this.createEntity.bind(this);
    this.getEntities   = this.getEntities.bind(this);
    this.getEntityById = this.getEntityById.bind(this);
    this.updateEntity  = this.updateEntity.bind(this);
    this.deleteEntity  = this.deleteEntity.bind(this);
  }

  /**
   * Create a new entity record
   */
  async createEntity(req, res) {
    try {
      const data = await this.entityService.createEntity(req.body);

      return res.status(201).json({
        success: true,
        message: 'Entity created successfully',
        data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to create entity record'
      });
    }
  }

  /**
   * Fetch paginated list of entities
   */
  async getEntities(req, res) {
    try {
      const { page, limit, search, sortBy, sortOrder } = req.query;

      const result = await this.entityService.getPaginatedEntities({
        page,
        limit,
        search,
        sortBy,
        sortOrder
      });

      return res.status(200).json({
        success: true,
        message: 'Entities retrieved successfully',
        ...result
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch entity records'
      });
    }
  }

  /**
   * Fetch a single entity record by ID
   */
  async getEntityById(req, res) {
    try {
      const { id } = req.params;
      const data = await this.entityService.getEntityById(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Entity record not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Entity retrieved successfully',
        data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch entity record'
      });
    }
  }

  /**
   * Update an existing entity record by ID
   */
  async updateEntity(req, res) {
    try {
      const { id } = req.params;
      const data = await this.entityService.updateEntity(id, req.body);

      return res.status(200).json({
        success: true,
        message: 'Entity updated successfully',
        data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to update entity record'
      });
    }
  }

  /**
   * Delete an entity record by ID
   */
  async deleteEntity(req, res) {
    try {
      const { id } = req.params;
      await this.entityService.deleteEntity(id);

      return res.status(200).json({
        success: true,
        message: 'Entity deleted successfully'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete entity record'
      });
    }
  }
}

module.exports = EntityController;