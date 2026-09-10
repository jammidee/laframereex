/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : September 11, 2026 02:55 AM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Sequelize model definition for public.configdb table.
 * ------------------------------------------------------------------------
 */

const { DataTypes } = require('sequelize');
const sequelize     = require('../../config/db');

const ConfigDB = sequelize.define('ConfigDB', {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  entityid: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: '_NA_',
  },
  appid: {
    type: DataTypes.STRING(50),
    allowNull: true,
  },
  userid: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  var_key: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
  },
  var_value: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  var_type: {
    type: DataTypes.STRING(50),
    allowNull: true,
    defaultValue: 'string',
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'archived'),
    allowNull: true,
    defaultValue: 'active',
  },
  vversion: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  pid: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  sstatus: {
    type: DataTypes.STRING(36),
    allowNull: true,
    defaultValue: 'ACTIVE',
  },
  deleted: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  updated_by: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  deleted_at: {
    type: DataTypes.DATE,
    allowNull: true,
  }
}, {
  tableName: 'configdb',
  timestamps: true,
  paranoid: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
});

module.exports = ConfigDB;