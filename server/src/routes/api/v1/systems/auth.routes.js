/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : April 07, 2026 09:41 PM
 * ------------------------------------------------------------------------
 */

const express          = require('express');
const router           = express.Router();

const AuthController   = require('../../../../controllers/api/v1/systems/auth.controller');
const AuthService      = require('../../../../services/api/v1/systems/auth.service');
const validateToken    = require('../../../../middlewares/jwt.middleware');

const controller = new AuthController(new AuthService());

/**
 * POST /api/v1/systems/auth/token
 * Generate JWT
 */
router.post('/token', controller.getAccessToken);

/**
 * GET /api/v1/systems/auth/validate
 * Validate JWT
 */
router.get('/validate', validateToken, controller.validateToken);

/**
 * GET /api/v1/systems/auth/datetime
 * Protected endpoint
 */
router.get('/datetime', validateToken, controller.getDateTime);

module.exports = router;