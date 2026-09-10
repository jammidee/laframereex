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
 * CREATED DATE : September 11, 2026 03:18 AM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Express routing definitions for ConfigDB API endpoints.
 * ------------------------------------------------------------------------
 */

const express            = require('express');
const router             = express.Router();

const ConfigDBController = require('../../../../controllers/api/v1/systems/configdb.controller');
const ConfigService      = require('../../../../services/api/v1/systems/configdb.service');
const validateToken      = require('../../../../middlewares/jwt.middleware');

const controller = new ConfigDBController(new ConfigService());

/**
 * POST /api/v1/systems/configdb/cache/clear
 * Clear in-memory configuration cache
 */
router.post('/cache/clear', validateToken, controller.clearCache);

/**
 * GET /api/v1/systems/configdb/:key
 * Fetch configuration value by key
 */
router.get('/:key', validateToken, controller.getConfig);

/**
 * POST /api/v1/systems/configdb
 * Create or update a configuration entry
 */
router.post('/', validateToken, controller.setConfig);

/**
 * DELETE /api/v1/systems/configdb/:key
 * Delete a configuration entry by key
 */
router.delete('/:key', validateToken, controller.deleteConfig);

module.exports = router;