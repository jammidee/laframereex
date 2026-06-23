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

const jwt    = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User   = require('../../../../models/user.model');

require('dotenv').config();

const { JWT_SECRET = 'secret' } = process.env;

/**
 * AuthService
 * Handles JWT generation and authentication logic.
 * No HTTP logic here.
 */
class AuthService {

  /**
   * Authenticate using Basic Auth credentials
   */
  async authenticateBasic(username, password) {

    const user = await User.findOne({
      where: { username }
    });

    if (!user) {
      throw new Error('Invalid username or password');
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error('Invalid username or password');
    }

    return user;
  }

  /**
   * Generate JWT Token
   */
  generateToken(user) {

    const payload = {
      id:        user.id,
      username:  user.username,
      email:     user.email,
      entityid:  user.entityid,
      status:    user.status
    };

    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: '1h'
    });
  }
}

module.exports = AuthService;