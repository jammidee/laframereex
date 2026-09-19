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
 * DESCRIPTION  : Express routing definitions for Lookup API endpoints.
 * ------------------------------------------------------------------------
 */

const express          = require('express');
const router           = express.Router();

const LookupController = require('./lookup.controller');
const LookupService    = require('./lookup.service');
const validateToken    = require('../../../../../middlewares/jwt.middleware');
const ipWhitelist      = require('../../../../../middlewares/ipWhitelist.middleware');
const domainWhitelist  = require('../../../../../middlewares/domainWhitelist.middleware');

const controller = new LookupController(new LookupService());

/**
 * POST /api/v1/modules/lookup
 * Create a new lookup record
 */
router.post('/', domainWhitelist, ipWhitelist, validateToken, controller.createLookup);

/**
 * GET /api/v1/modules/lookup
 * Fetch paginated list of lookups
 */
router.get('/', domainWhitelist, ipWhitelist, validateToken, controller.getLookups);

/**
 * GET /api/v1/modules/lookup/:id
 * Fetch a single lookup record by ID
 */
router.get('/:id', domainWhitelist, ipWhitelist, validateToken, controller.getLookupById);

/**
 * PUT /api/v1/modules/lookup/:id
 * Update a lookup record by ID
 */
router.put('/:id', domainWhitelist, ipWhitelist, validateToken, controller.updateLookup);

/**
 * DELETE /api/v1/modules/lookup/:id
 * Delete a lookup record by ID
 */
router.delete('/:id', domainWhitelist, ipWhitelist, validateToken, controller.deleteLookup);

module.exports = router;