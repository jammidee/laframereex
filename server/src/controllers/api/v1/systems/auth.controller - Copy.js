/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso)
 * This file is part of the Lalulla System.
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : April 07, 2026 09:41 PM
 * ------------------------------------------------------------------------
 */

class AuthController {

  constructor(AuthService) {
    this.authService = AuthService;
  }

  /**
   * POST /token
   * Uses Basic Authorization header
   * Returns JWT access token
   */
  getAccessToken = async (req, res) => {

    try {

      const authHeader = req.headers.authorization;

      if (!authHeader || !authHeader.startsWith('Basic ')) {
        return res.status(401).json({
          success: false,
          message: 'Missing Basic Authorization header'
        });
      }

      const base64Credentials = authHeader.split(' ')[1];
      const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');

      const [username, password] = credentials.split(':');

      const user = await this.authService.authenticateBasic(
        username.trim(),
        password.trim()
      );

      const token = this.authService.generateToken(user);

      return res.json({
        success: true,
        token,
        expires_in: 3600
      });

    } catch (err) {

      return res.status(401).json({
        success: false,
        message: err.message
      });

    }
  }

  /**
   * GET /validate
   * Validate JWT
   */
  validateToken = async (req, res) => {

    return res.json({
      success: true,
      user: req.user
    });

  }

  /**
   * GET /datetime
   * Protected endpoint
   */
  getDateTime = async (req, res) => {

    return res.json({
      success: true,
      datetime: new Date()
    });

  }
}

module.exports = AuthController;