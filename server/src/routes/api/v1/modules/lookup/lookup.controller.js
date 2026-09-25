/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : September 17, 2026 07:25 PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Controller routing incoming HTTP requests to LookupService.
 * ------------------------------------------------------------------------
 */

class LookupController {
  constructor(lookupService) {
    this.lookupService = lookupService;
    this.createLookup  = this.createLookup.bind(this);
    this.getLookups    = this.getLookups.bind(this);
    this.getLookupById = this.getLookupById.bind(this);
    this.updateLookup  = this.updateLookup.bind(this);
    this.deleteLookup  = this.deleteLookup.bind(this);
  }

  /**
   * Create a new lookup record
   */
  async createLookup(req, res) {
    try {
      const data = await this.lookupService.createLookup(req.body);

      return res.status(201).json({
        success: true,
        message: 'Lookup created successfully',
        data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to create lookup record'
      });
    }
  }

  /**
   * Fetch paginated list of lookups
   */
  /**
   * Fetch paginated list of lookups with entityid and keyid filtering
   */
  async getLookups(req, res) {
    try {
      const { entityid = 'CGONE', keyid, page, limit, search, sortBy, sortOrder } = req.query;

      const result = await this.lookupService.getPaginatedLookups({
        entityid,
        keyid,
        page,
        limit,
        search,
        sortBy,
        sortOrder
      });

      return res.status(200).json({
        success: true,
        message: 'Lookups retrieved successfully',
        ...result
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch lookup records'
      });
    }
  }

  /**
   * Fetch a single lookup record by ID
   */
  async getLookupById(req, res) {
    try {
      const { id } = req.params;
      const data = await this.lookupService.getLookupById(id);

      if (!data) {
        return res.status(404).json({
          success: false,
          message: 'Lookup record not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Lookup retrieved successfully',
        data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to fetch lookup record'
      });
    }
  }

  /**
   * Update an existing lookup record by ID
   */
  async updateLookup(req, res) {
    try {
      const { id } = req.params;
      const data = await this.lookupService.updateLookup(id, req.body);

      return res.status(200).json({
        success: true,
        message: 'Lookup updated successfully',
        data
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to update lookup record'
      });
    }
  }

  /**
   * Delete a lookup record by ID
   */
  async deleteLookup(req, res) {
    try {
      const { id } = req.params;
      await this.lookupService.deleteLookup(id);

      return res.status(200).json({
        success: true,
        message: 'Lookup deleted successfully'
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete lookup record'
      });
    }
  }
}

module.exports = LookupController;