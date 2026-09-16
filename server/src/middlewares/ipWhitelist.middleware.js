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

const config = require('../config/app.config'); // Adjust relative path as needed

/**
 * IP Whitelist Middleware Filter
 * Restricts API endpoint access to explicitly approved IP addresses.
 */
const ipWhitelistMiddleware = (req, res, next) => {
  // Extract client IP (handles standard express app.set('trust proxy', true) if behind Nginx/Load Balancer)
  const clientIp = req.ip || req.connection.remoteAddress;

  // Retrieve whitelist array from global config
  const whitelist = config.ipWhitelist || [];

  // Bypass or evaluate check
  // Clean up IPv6 mapped IPv4 addresses if applicable (e.g., ::ffff:127.0.0.1)
  const formattedIp = clientIp.replace(/^.*:/, '');

  const isAllowed = whitelist.some(allowedIp => {
    return clientIp === allowedIp || formattedIp === allowedIp.replace(/^.*:/, '');
  });

  if (!isAllowed) {
    return res.status(403).json({
      success: false,
      error: {
        code: 'FORBIDDEN_IP',
        message: 'Access denied: Your IP address is not authorized to access this resource.',
        ip: clientIp
      }
    });
  }

  next();
};

module.exports = ipWhitelistMiddleware;
