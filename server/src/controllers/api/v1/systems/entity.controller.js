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
const { logSqlAction } = require('../../../../helpers/sqlsynclogs.helper');

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
        let capturedSql = '';
        let executionTime = 0;

        try {
            const startTime = Date.now();
            
            // Pass a Sequelize logging option to capture the exact SQL and execution time
            const data = await this.entityService.createEntity(req.body, {
                logging: (sql, timing) => {
                    capturedSql = sql;
                    if (typeof timing === 'number') {
                        executionTime = timing;
                    }
                },
                benchmark: true // Enables timing measurement in Sequelize
            });

            if (!executionTime) {
                executionTime = Date.now() - startTime;
            }

            await logAction(
                req,
                'ENTITY_CREATE',
                `Created entity record: ${data.name} (ID: ${data.id})`,
                'INFO',
                data.display_id || data.id
            );

            await logSqlAction(
                req,
                capturedSql || `-- Executed create for entity ID: ${data.id}`,
                executionTime,
                true,
                'ENTITY_CREATE',
                data.display_id || data.id,
                'INFO'
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

            await logSqlAction(
                req,
                capturedSql ? `-- FAILED: ${capturedSql} | Error: ${error.message}` : `-- FAILED CREATE: ${error.message}`,
                executionTime,
                false,
                'ENTITY_CREATE_ERROR',
                '_NA_',
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
        let capturedSql = '';
        let executionTime = 0;

        try {
            const { id } = req.params;
            const startTime = Date.now();

            const data = await this.entityService.updateEntity(id, req.body, {
                logging: (sql, timing) => {
                    capturedSql = sql;
                    if (typeof timing === 'number') {
                        executionTime = timing;
                    }
                },
                benchmark: true
            });

            if (!executionTime) {
                executionTime = Date.now() - startTime;
            }

            await logAction(
                req,
                'ENTITY_UPDATE',
                `Updated entity record ID: ${id}`,
                'INFO',
                data.display_id || id
            );

            await logSqlAction(
                req,
                capturedSql || `-- Executed update for entity ID: ${id}`,
                executionTime,
                true,
                'ENTITY_UPDATE',
                data.display_id || id,
                'INFO'
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

            await logSqlAction(
                req,
                capturedSql ? `-- FAILED: ${capturedSql} | Error: ${error.message}` : `-- FAILED UPDATE ID ${req.params.id}: ${error.message}`,
                executionTime,
                false,
                'ENTITY_UPDATE_ERROR',
                req.params.id,
                'ERROR'
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
        let capturedSql = '';
        let executionTime = 0;

        try {
            const { id } = req.params;
            const startTime = Date.now();

            await this.entityService.deleteEntity(id, {
                logging: (sql, timing) => {
                    capturedSql = sql;
                    if (typeof timing === 'number') {
                        executionTime = timing;
                    }
                },
                benchmark: true
            });

            if (!executionTime) {
                executionTime = Date.now() - startTime;
            }

            await logAction(
                req,
                'ENTITY_DELETE',
                `Soft-deleted entity record ID: ${id}`,
                'WARNING',
                id
            );

            await logSqlAction(
                req,
                capturedSql || `-- Executed soft delete for entity ID: ${id}`,
                executionTime,
                true,
                'ENTITY_DELETE',
                id,
                'WARNING'
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

            await logSqlAction(
                req,
                capturedSql ? `-- FAILED: ${capturedSql} | Error: ${error.message}` : `-- FAILED DELETE ID ${req.params.id}: ${error.message}`,
                executionTime,
                false,
                'ENTITY_DELETE_ERROR',
                req.params.id,
                'ERROR'
            );

            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to delete entity record'
            });
        }
    }
}

module.exports = EntityController;