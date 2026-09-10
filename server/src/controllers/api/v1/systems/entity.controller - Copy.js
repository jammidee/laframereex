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
    this.getEntities = this.getEntities.bind(this);
  }

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
}

module.exports = EntityController;