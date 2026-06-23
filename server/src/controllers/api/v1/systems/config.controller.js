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

            const value = await this.configService.get(key, {
                entityid: req.query.entityid
            });

            return res.json({
                success: true,
                key,
                value
            });

        } catch (err) {

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

            return res.json({
                success: true,
                message: 'Configuration saved'
            });

        } catch (err) {

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

            await this.configService.delete(key, req.query.entityid);

            return res.json({
                success: true,
                message: 'Configuration deleted'
            });

        } catch (err) {

            return res.status(404).json({
                success: false,
                message: err.message
            });
        }
    };
}

module.exports = ConfigController;