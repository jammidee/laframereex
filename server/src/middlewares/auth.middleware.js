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
 * CREATED DATE : March 14, 2026 07:02 PM
 * ------------------------------------------------------------------------
 */

const logAction = require('../utils/logAction'); // assume helper exists

class AuthMiddleware {

  // Ensure the user is authenticated, else log & redirect to login
  static ensureAuthenticated(req, res, next) {

    //===============================
    // Check if user is logged in
    //===============================
    if (req.session.logged_in || (req.session.auth && req.session.auth.logged_in)) {
      return next();
    }

    //===============================
    // Unauthorized access attempt
    //===============================
    try {
      // Capture caller info (controller/method) if available
      const callerInfo = req.route ? `${req.route.path}` : 'Unknown Route';

      // Capture the current URI for redirect after login
      const redirectUrl = encodeURIComponent(req.originalUrl || '/');

      // Log the unauthorized attempt
      logAction(
        req,
        'unauthorized_access',
        `Unauthorized access attempt to ${callerInfo} at URI: ${req.originalUrl}`,
        'WARNING',
        true
      );

      //=======================================
      // Redirect to login page with return URL
      //=======================================
      return res.redirect(`/auth/login?redirect=${redirectUrl}&t=` + + Date.now());

    } catch (err) {

      console.error('Error logging unauthorized access:', err);
      // fallback redirect
      return res.redirect('/auth/login?t=' + Date.now() );

    }

  }

}

module.exports = AuthMiddleware;