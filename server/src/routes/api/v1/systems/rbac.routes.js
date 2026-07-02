/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : July 02, 2026 04:30 PM
 * ------------------------------------------------------------------------
 */

const express          = require('express');
const router           = express.Router();

const RbacController   = require('../../../../controllers/api/v1/systems/rbac.controller');
const validateToken    = require('../../../../middlewares/jwt.middleware');

const controller = new RbacController();

/**
 * GET /api/v1/systems/rbac/permissions
 * Fetches the mapped permissions dictionary for the authenticated user
 */
router.get('/permissions', validateToken, controller.getUserPermissions);

module.exports = router;