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
 * CREATED DATE : August 23, 2026 04:16PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Sequelize model definition for public.entitys table.
 * ------------------------------------------------------------------------
 */

const { DataTypes } = require('sequelize');
const sequelize     = require('../../config/db');

const Entity = sequelize.define('Entity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  juid: {
    type: DataTypes.CHAR(36),
    allowNull: false,
    unique: true,
  },
  display_id: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  address_line1: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  address_line2: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  state_province: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  postal_code: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING(100),
    allowNull: true,
  },
  execution_mode: {
    type: DataTypes.STRING(50),
    defaultValue: 'MODE 1',
  },
  charge_type: {
    type: DataTypes.STRING(20),
    defaultValue: 'BOTH',
  },
  status: {
    type: DataTypes.STRING(20),
    allowNull: false,
    defaultValue: 'ACTIVE',
  },
  start_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  end_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  max_users: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  company_charge: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0,
  },
  user_charge: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0,
  },
  excess_charge: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0,
  },
  quota: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  old_juid: {
    type: DataTypes.CHAR(36),
    allowNull: true,
  },
  is_deleted: {
    type: DataTypes.SMALLINT,
    allowNull: false,
    defaultValue: 0,
  },
  created_at: {
    type: DataTypes.DATE,
  },
  updated_at: {
    type: DataTypes.DATE,
  }
}, {
  tableName: 'entitys',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at',
});

module.exports = Entity;