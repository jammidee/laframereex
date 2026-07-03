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
      email: 'superadmin@cgone.com',
      password: md5('supersecret123'),
      roleid: 'Superadmin',
      entityid: 'CGONE'
    },
    {
      id: '1',
      username: 'root',
      email: 'root@cgone.com',
      password: md5('toor'),
      roleid: 'Superadmin',
      entityid: 'CGONE'
    }
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