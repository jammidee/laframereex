/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : CloudGate PHP Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : March 07, 2026 11:50 PM
 * ------------------------------------------------------------------------
 */

const crypto          = require('crypto');
const config          = require('../../config/app.config');
const logAction       = require('../../utils/logAction');
const { isLogged }    = require('../../helpers/auth.helper');


class AuthController {

  constructor(AuthService) {
    this.authService = AuthService; // Passed parameter
  }

  /**
   * Render Login Page
   * Uses Pug template from /views/login/index.pug
   */
  showLoginPage = async (req, res) => {

    // Just redirect to secured page because we are
    // still authenticated.
    if (isLogged(req)) {

      return res.redirect('/dashboard');

    }

    // Get redirect URL from query parameter
    // (e.g., /auth/login?redirect=/dashboard)
    const redirectUrl = req.query.redirect || '';

    res.render('systems/auth/login', {
        error: null,
        redirect_url: redirectUrl  // pass to the view
    });

  }

  /**
   * Handle Login POST
   * - Calls service
   * - Creates session
   */
  login = async (req, res) => {

    const { username, password, redirect_url } = req.body

    try {

      // -------------------------------------------------
      // 1️⃣ Check SUPERADMINS from config first
      // -------------------------------------------------

      const hashedInput = crypto.createHash('md5').update(password).digest('hex');

      // 03/14/2026 Get the matching data in the config.
      const superadmin = config.superadmins.find(admin =>admin.email === username && admin.password === hashedInput);

      if (superadmin) {

        req.session.user = {
          id: 'SUPERADMIN', username: superadmin.email, role: 'SUPERADMIN'
        }

        // ✅ Set Lalulla-style session data
        req.session.user_id     = 0;
        req.session.user_name   = 'Superadmin';
        req.session.user_email  = superadmin.email;
        req.session.user_role   = 'Superadmin';
        req.session.user_entity = config.appentity;
        req.session.user_appid  = config.appid;
        req.session.logged_in   = true;

        // Optional: update your main app session flag
        if (req.session.app) {
          req.session.app.logged = 'YES';
        }

        // In the app.js, user information is normalized
        // and loaded to be access by pug like below. The function 'can'
        // is also published.

        //--------------------------------------------------------
        // // Globalize req.user
        // const { can } = require('./src/helpers/access.helper');
        // app.use((req, res, next) => {

        //   if (req.session?.logged_in) {

        //     req.user = {
        //       id:     req.session.user_id,
        //       name:   req.session.user_name,
        //       email:  req.session.user_email,
        //       role:   req.session.user_role,
        //       entity: req.session.user_entity,
        //       appid:  req.session.user_appid
        //     }

        //     // expose to pug automatically
        //     res.locals.user = req.user;
        //   // Expose can in the pages
        //   res.locals.can = can;

        //   }

        //   next()

        // })
        //--------------------------------------------------

        // Redirect back if redirect_url exists
        if (redirect_url) {
            return res.redirect(redirect_url);
        }

        return res.redirect('/dashboard');

      }

      // -------------------------------------------------
      // 2️⃣ Otherwise check database
      // -------------------------------------------------


      const user = await this.authService.authenticate(username, password)

      // Store minimal session info
      req.session.user = {
        id: user.id,
        username: user.username,
        firstname: user.firstname,
        lastname: user.lastname,
        store_id: user.store_id
      }

      // ✅ Set Lalulla-style session data
      req.session.user_id     = user.id;
      req.session.user_name   = user.username;
      req.session.user_email  = user.email;
      req.session.user_role   = user.roleid ?? 'Superadmin';
      req.session.user_entity = user.entityid;
      req.session.user_appid  = config.appid;
      req.session.logged_in   = true;

      // Optional: update your main app session flag
      if (req.session.app) {
        req.session.app.logged = 'YES';
      }

      if (redirect_url) {
          return res.redirect(redirect_url);
      }

      // Redirect after successful login
      res.redirect('/dashboard')

    } catch (err) {

      console.log(`There is an error --------> ${err}.`);
      res.redirect('/auth/login')

      // Re-render login page with error message
      // res.render('systems/auth/login', {
      //   error: err.message
      // })

    }
  }

  /**
   * Logout
   */
  // logout = async (req, res) => {
  //   req.session.destroy(() => {
  //     res.redirect('/auth/login')
  //   })
  // }

logout = async (req, res) => {

  try {
    await logAction( req,'logout', 'User logged out', 'INFO', false );
  } catch (err) {
    console.error(err);
  }

  req.session.destroy((err) => {

    if (err) {
      console.error('Session destroy error:', err);
    }

    res.clearCookie('connect.sid');
    res.redirect('/auth/login?t=' + Date.now());

  });

};

//Added by Jammi Dee 06/12/2026
forgot = async (req, res) => {

  try {
    await logAction( req,'forgot', 'User forgot password invoked', 'INFO', false );
  } catch (err) {
    console.error(err);
  }

  res.render('systems/auth/forgot', {
    error: null
  });

};

//Added by Jammi Dee 06/12/2026
help = async (req, res) => {

  try {
    await logAction( req,'help', 'User invoked help page.', 'INFO', false );
  } catch (err) {
    console.error(err);
  }

  res.render('systems/auth/help', {
    error: null
  });

};



}

module.exports = AuthController