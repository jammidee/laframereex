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
 * CREATED DATE : March 14, 2026, 9:53 PM
 * ------------------------------------------------------------------------
 */

const { Sequelize } = require('sequelize')

// connect to MySQL
const sequelize = new Sequelize('cloudgateone', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // true for SQL logging
})

module.exports = sequelize