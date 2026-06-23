/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * CREATED DATE : March 14, 2026, 9:53 PM
 * ------------------------------------------------------------------------
 */

// THis is for the modules use

const { Sequelize } = require('sequelize')

// connect to MySQL
const sequelize = new Sequelize('cloudgateone', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // true for SQL logging
})

module.exports = sequelize