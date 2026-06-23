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

const bcrypt  = require('bcrypt')
const User    = require('../../models/user.model')

/**
 * LoginService
 * Handles authentication logic only.
 * No HTTP logic here.
 */
class AuthService {

  /**
   * Validate username & password
   */
  async authenticate(email, password) {

    const user = await User.findOne({
      where: { email }
    })

    if (!user) {
      throw new Error('Invalid username or password')
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
      throw new Error('Invalid username or password')
    }

    return user
  }
}

module.exports = AuthService