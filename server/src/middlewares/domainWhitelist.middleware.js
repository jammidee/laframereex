/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : September 17, 2026
 * ------------------------------------------------------------------------
 */

const config = require('../config/app.config');

/**
 * Domain / Origin Whitelist Middleware Filter
 * Restricts API requests to approved Origin or Referer URLs.
 */
const domainWhitelistMiddleware = (req, res, next) => {
  // Extract Origin or Fallback to Referer header
  const origin = req.get('origin') || req.get('referer');
  const whitelist = config.domainWhitelist || [];

  // If no origin/referer header is present (e.g. direct backend curl/Postman requests), 
  // you can choose to block it or let server-to-server calls pass.
  if (!origin) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN_ORIGIN',
        message: 'Access denied: Missing Origin or Referer header.'
      }
    });
  }

  // Check if the request origin starts with or matches any whitelisted domain entry
  const isAllowed = whitelist.some(allowedDomain => {
    return origin.startsWith(allowedDomain);
  });

  if (!isAllowed) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN_ORIGIN',
        message: 'Access denied: This domain/origin is not authorized to consume this API.',
        origin: origin
      }
    });
  }

  next();
};

module.exports = domainWhitelistMiddleware;