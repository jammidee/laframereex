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
 * DESCRIPTION  : Express routing definitions for Entity API endpoints.
 * ------------------------------------------------------------------------
 */

const express          = require('express');
const router           = express.Router();

const EntityController = require('../../../../controllers/api/v1/systems/entity.controller');
const EntityService    = require('../../../../services/api/v1/systems/entity.service');
const validateToken    = require('../../../../middlewares/jwt.middleware');
const ipWhitelist      = require('../../../../middlewares/ipWhitelist.middleware');
const domainWhitelist  = require('../../../../middlewares/domainWhitelist.middleware');

const controller = new EntityController(new EntityService());

/**
 * POST /api/v1/systems/entity
 * Create a new entity record
 */
router.post('/', domainWhitelist, ipWhitelist, validateToken, controller.createEntity);

/**
 * GET /api/v1/systems/entity
 * Fetch paginated list of entities
 */
router.get('/', domainWhitelist, ipWhitelist, validateToken, controller.getEntities);

/**
 * GET /api/v1/systems/entity/:id
 * Fetch a single entity record by ID
 */
router.get('/:id', domainWhitelist, ipWhitelist, validateToken, controller.getEntityById);

/**
 * PUT /api/v1/systems/entity/:id
 * Update an entity record by ID
 */
router.put('/:id', domainWhitelist, ipWhitelist, validateToken, controller.updateEntity);

/**
 * DELETE /api/v1/systems/entity/:id
 * Delete an entity record by ID
 */
router.delete('/:id', domainWhitelist, ipWhitelist, validateToken, controller.deleteEntity);

module.exports = router;