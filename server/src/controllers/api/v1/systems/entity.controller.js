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

'use strict';

const { logAction } = require('../../../../helpers/system_logger.helper');

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

            await logAction(
                req,
                'ENTITY_CREATE',
                `Created entity record: ${data.name} (ID: ${data.id})`,
                'INFO',
                data.display_id || data.id
            );

            return res.status(201).json({
                success: true,
                message: 'Entity created successfully',
                data
            });
        } catch (error) {
            await logAction(
                req,
                'ENTITY_CREATE_ERROR',
                `Failed to create entity record: ${error.message}`,
                'ERROR'
            );

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

            await logAction(
                req,
                'ENTITIES_FETCH',
                `Retrieved paginated entity list (page: ${page || 1}, limit: ${limit || 10})`,
                'INFO',
                '_NA_'
            );

            return res.status(200).json({
                success: true,
                message: 'Entities retrieved successfully',
                ...result
            });
        } catch (error) {
            await logAction(
                req,
                'ENTITIES_FETCH_ERROR',
                `Failed to fetch entity records: ${error.message}`,
                'ERROR'
            );

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
                await logAction(
                    req,
                    'ENTITY_FETCH_NOT_FOUND',
                    `Entity record not found for ID: ${id}`,
                    'WARNING',
                    id
                );

                return res.status(404).json({
                    success: false,
                    message: 'Entity record not found'
                });
            }

            await logAction(
                req,
                'ENTITY_FETCH',
                `Retrieved entity record for ID: ${id}`,
                'INFO',
                data.display_id || id
            );

            return res.status(200).json({
                success: true,
                message: 'Entity retrieved successfully',
                data
            });
        } catch (error) {
            await logAction(
                req,
                'ENTITY_FETCH_ERROR',
                `Failed to fetch entity record ID ${req.params.id}: ${error.message}`,
                'ERROR',
                req.params.id
            );

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

            await logAction(
                req,
                'ENTITY_UPDATE',
                `Updated entity record ID: ${id}`,
                'INFO',
                data.display_id || id
            );

            return res.status(200).json({
                success: true,
                message: 'Entity updated successfully',
                data
            });
        } catch (error) {
            await logAction(
                req,
                'ENTITY_UPDATE_ERROR',
                `Failed to update entity record ID ${req.params.id}: ${error.message}`,
                'ERROR',
                req.params.id
            );

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

            await logAction(
                req,
                'ENTITY_DELETE',
                `Soft-deleted entity record ID: ${id}`,
                'WARNING',
                id
            );

            return res.status(200).json({
                success: true,
                message: 'Entity deleted successfully'
            });
        } catch (error) {
            await logAction(
                req,
                'ENTITY_DELETE_ERROR',
                `Failed to delete entity record ID ${req.params.id}: ${error.message}`,
                'ERROR',
                req.params.id
            );

            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to delete entity record'
            });
        }
    }
}

module.exports = EntityController;