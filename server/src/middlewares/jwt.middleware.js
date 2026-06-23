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

const jwt = require('jsonwebtoken');
require('dotenv').config();

const { JWT_SECRET = 'secret' } = process.env;

/**
 * JWT Validation Middleware
 * Protects API routes
 */
module.exports = function validateToken(req, res, next) {

  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Missing or invalid Authorization header'
    });
  }

  const token = authHeader.split(' ')[1];

  try {

    const decoded = jwt.verify(token, JWT_SECRET);

    // Attach decoded payload to request
    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token'
    });

  }
};