/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla NodeJS Framework
 * ------------------------------------------------------------------------
 */

const config = {}

// ---------------------------------------------------------------------
// Application Info
// ---------------------------------------------------------------------

config.appid            = 'CGONE'
config.appname          = 'Lalulla System'
config.appdesc          = 'Lalulla Application Template'
config.appprefix        = 'FEA'
config.appversion       = '1.07.1972'
config.appcopyright     = 'Lalulla OPC'
config.appentity        = 'LALULLA'

config.cg_version       = '1.19.72'
config.allowlogin       = true
config.autoreg          = false
config.cg_landingpage   = true

config.cfgName          = 'Jammi Dee'
config.cfgPhone         = '0917-580-9483'
config.cfgEmail         = 'jammi_dee@yahoo.com'

// ---------------------------------------------------------------------
// Business
// ---------------------------------------------------------------------

config.max_user_cap = 50

// ---------------------------------------------------------------------
// Mail Notification Settings
// ---------------------------------------------------------------------

config.mail = {
  api_key:    '111-ae6d6fbf53f804bbb7b753e58ed66970-xyz',
  api_secret: '222-8cf78ed0415e57bf03ef953fa655fba2-xyz',
  url:        'https://api.mailjet.com/v3.1/send',
  from:       'jammi_dee@yahoo.com',
  app_name:   'Cloudgate One'
}

// ---------------------------------------------------------------------
// Client Config
// ---------------------------------------------------------------------

config.client = {
  parent_api_url: 'http://localhost:8340'
}

module.exports = config