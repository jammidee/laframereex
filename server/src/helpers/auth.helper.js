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
 * CREATED DATE : March 15, 2026 01:33 AM
 * ------------------------------------------------------------------------
 */

/**
 * Check if user is logged in
 * @param {object} req - Express request object
 * @returns {boolean}
 */
function isLogged(req) {
    if (!req || !req.session) return false;

    // Check session flags
    return !!(req.session.logged_in || (req.session.auth && req.session.auth.logged_in));
}

module.exports = { isLogged };