/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : August 23, 2026 04:22 PM
 * ------------------------------------------------------------------------
 */

const express          = require('express');
const router           = express.Router();

const EntityController = require('../../../../controllers/api/v1/systems/entity.controller');
const EntityService    = require('../../../../services/api/v1/systems/entity.service');
const validateToken    = require('../../../../middlewares/jwt.middleware');

const controller = new EntityController(new EntityService());

/**
 * GET /api/v1/systems/entity
 * Fetch paginated list of entities
 */
router.get('/', validateToken, controller.getEntities);

module.exports = router;