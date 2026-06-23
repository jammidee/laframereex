/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * Lalulla System is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : March 07, 2026 11:30 PM
 * ------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * CREATED DATE : March 28, 2026
 * ------------------------------------------------------------------------
 */

const { DataTypes } = require('sequelize');
const sequelize     = require('../config/db');

const User          = sequelize.define('User', {

  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },

  username: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING(150),
    allowNull: false,
    unique: true,
  },

  firstname: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },

  lastname: {
    type: DataTypes.STRING(150),
    allowNull: false,
  },

  phone: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },

  gender: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '1=Male, 2=Female, 3=Other'
  },

  store_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },

  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'ACTIVE',
  },

  entityid: {
    type: DataTypes.STRING(50),
    allowNull: false,
    defaultValue: 'GCONE',
  },

  last_login_at: {
    type: DataTypes.DATE,
    allowNull: true,
  },

  created_at: {
    type: DataTypes.DATE,
  },

  updated_at: {
    type: DataTypes.DATE,
  },

  deleted_at: {
    type: DataTypes.DATE,
  }

}, {
  tableName: 'users',

  // Enable Sequelize timestamp handling
  timestamps: true,

  // Map to snake_case columns
  createdAt: 'created_at',
  updatedAt: 'updated_at',

  // Enable soft delete
  paranoid: true,
  deletedAt: 'deleted_at',
});

module.exports = User;