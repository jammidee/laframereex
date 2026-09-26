/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : September 27, 2026 01:49 PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Express routing definitions for User API endpoints.
 * ------------------------------------------------------------------------
 */

'use strict';

const express         = require('express');
const router          = express.Router();

const UserController  = require('../../../../controllers/api/v1/systems/user.controller');
const UserService     = require('../../../../services/api/v1/systems/user.service');
const validateToken   = require('../../../../middlewares/jwt.middleware');
const ipWhitelist     = require('../../../../middlewares/ipWhitelist.middleware');
const domainWhitelist = require('../../../../middlewares/domainWhitelist.middleware');

const controller = new UserController(new UserService());

/**
 * POST /api/v1/systems/user
 * Create a new user record
 */
router.post('/', domainWhitelist, ipWhitelist, validateToken, controller.createUser);

/**
 * GET /api/v1/systems/user
 * Fetch paginated list of users
 */
router.get('/', domainWhitelist, ipWhitelist, validateToken, controller.getUsers);

/**
 * GET /api/v1/systems/user/:id
 * Fetch a single user record by ID
 */
router.get('/:id', domainWhitelist, ipWhitelist, validateToken, controller.getUserById);

/**
 * PUT /api/v1/systems/user/:id
 * Update a user record by ID
 */
router.put('/:id', domainWhitelist, ipWhitelist, validateToken, controller.updateUser);

/**
 * DELETE /api/v1/systems/user/:id
 * Delete a user record by ID
 */
router.delete('/:id', domainWhitelist, ipWhitelist, validateToken, controller.deleteUser);

module.exports = router;