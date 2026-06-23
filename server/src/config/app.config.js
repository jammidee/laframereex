/**
 * Copyright (C) 2012-2028 Lalulla OPC. All rights reserved.
 * Copyright (c) 2017 - Joel M. Damaso - mailto:jammi_dee@yahoo.com Manila/Philippines
 * This file is part of Lalulla OPC System.
 *
 * Framework Designed by: Jammi Dee (jammi_dee@yahoo.com)
 * 03/14/2026 09:59 AM
 *
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
      email: 'superadmin@cgone.com',
      password: md5('supersecret123')
    },
    {
      email: 'root@cgone.com',
      password: md5('toor')
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