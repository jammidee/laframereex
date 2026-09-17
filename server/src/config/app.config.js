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
 * CREATED DATE : 03/14/2026 09:59 AM
 * ------------------------------------------------------------------------
 * Lalulla Control Configuration
 * ------------------------------------------------------------------------
 */

const crypto          = require('crypto');
const lalullaConfig   = require('./app.lalulla');
const accessConfig    = require('./app.access');

// ---------------------------------------------
// Helper
// ---------------------------------------------
function md5(value) {
  return crypto.createHash('md5').update(value).digest('hex');
}

// ---------------------------------------------
// Local Config (Superadmins)
// ---------------------------------------------
const localConfig = {
  superadmins: [
    {
      id: '0',
      username: 'Superadmin',
      firstname: 'Superadmin',
      lastname: 'User',
      email: 'superadmin@cgone.com',
      password: md5('supersecret123'),
      roleid: 'Superadmin',
      entityid: 'CGONE'
    },
    {
      id: '1',
      username: 'root',
      firstname: 'Root',
      lastname: 'User',
      email: 'root@cgone.com',
      password: md5('toor'),
      roleid: 'Superadmin',
      entityid: 'CGONE'
    }
  ],

  // Define allowed IP whitelist addresses (supports IPv4 / IPv6 / loopback)
  ipWhitelist: [
    '127.0.0.1',
    '::1',
    '192.168.1.50' // Example internal office IP
  ],
  
  // Domain / Origin Whitelist (include protocol and domain, no trailing slashes)
  domainWhitelist: [
    'https://lalulla.com',
    'https://app.lalulla.com',
    'http://localhost:3000' // For local frontend development
  ]

}

// ---------------------------------------------
// Merge configs
// ---------------------------------------------
module.exports = {
  ...lalullaConfig,
  ...localConfig,
  ...accessConfig
}