/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso)
 * This file is part of the Lalulla System.
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : April 08, 2026 12:15 AM
 * ------------------------------------------------------------------------
 */

'use strict';

const { logAction } = require('../../../../helpers/system_logger.helper');

/**
 * ConfigController (API V1)
 * HTTP layer only
 * Business logic delegated to injected service
 */
class ConfigController {

    /**
     * Inject service via constructor
     * Keeps controller decoupled and testable
     */
    constructor(configService) {
        this.configService = configService;
    }

    /**
     * ------------------------------------------------------------------
     * GET /api/v1/systems/config/:key
     * Retrieve configuration value
     * ------------------------------------------------------------------
     */
    get = async (req, res) => {
        try {
            const { key } = req.params;
            const entityid = req.query.entityid || '_NA_';

            const value = await this.configService.get(key, {
                entityid: req.query.entityid
            });

            await logAction(
                req,
                'CONFIG_FETCH',
                `Retrieved configuration for key: ${key}`,
                'INFO',
                entityid
            );

            return res.json({
                success: true,
                key,
                value
            });

        } catch (err) {
            await logAction(
                req,
                'CONFIG_FETCH_ERROR',
                `Failed to retrieve configuration for key [${req.params.key}]: ${err.message}`,
                'ERROR',
                req.query.entityid || '_NA_'
            );

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    };

    /**
     * ------------------------------------------------------------------
     * POST /api/v1/systems/config
     * Create or update configuration
     * ------------------------------------------------------------------
     */
    set = async (req, res) => {
        try {
            const { key, value, entityid, description, var_type } = req.body;

            if (!key) {
                await logAction(
                    req,
                    'CONFIG_SET_FAILED',
                    'Failed to save configuration: Key is required',
                    'WARNING',
                    entityid || '_NA_'
                );

                return res.status(400).json({
                    success: false,
                    message: 'Key is required'
                });
            }

            await this.configService.set(key, value, {
                entityid,
                description,
                var_type,
                userid: req.user ? req.user.userid : 0
            });

            await logAction(
                req,
                'CONFIG_SET',
                `Successfully saved configuration for key: ${key}`,
                'INFO',
                entityid || '_NA_'
            );

            return res.json({
                success: true,
                message: 'Configuration saved'
            });

        } catch (err) {
            await logAction(
                req,
                'CONFIG_SET_ERROR',
                `Failed to save configuration for key [${req.body?.key || 'unknown'}]: ${err.message}`,
                'ERROR',
                req.body?.entityid || '_NA_'
            );

            return res.status(500).json({
                success: false,
                message: err.message
            });
        }
    };

    /**
     * ------------------------------------------------------------------
     * DELETE /api/v1/systems/config/:key
     * Soft delete configuration
     * ------------------------------------------------------------------
     */
    delete = async (req, res) => {
        try {
            const { key } = req.params;
            const entityid = req.query.entityid || '_NA_';

            await this.configService.delete(key, req.query.entityid);

            await logAction(
                req,
                'CONFIG_DELETE',
                `Soft-deleted configuration for key: ${key}`,
                'WARNING',
                entityid
            );

            return res.json({
                success: true,
                message: 'Configuration deleted'
            });

        } catch (err) {
            await logAction(
                req,
                'CONFIG_DELETE_ERROR',
                `Failed to delete configuration for key [${req.params.key}]: ${err.message}`,
                'ERROR',
                req.query.entityid || '_NA_'
            );

            return res.status(404).json({
                success: false,
                message: err.message
            });
        }
    };
}

module.exports = ConfigController;