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
 * CREATED DATE : September 11, 2026 02:24 AM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Sequelize model definition for public.lookups table.
 * ------------------------------------------------------------------------
 */

const { DataTypes } = require('sequelize');
const sequelize     = require('../../config/db');

const Lookup = sequelize.define('Lookup', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  juid: {
    type: DataTypes.CHAR(36),
    allowNull: true,
  },
  entityid: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: null,
  },
  appid: {
    type: DataTypes.STRING(36),
    allowNull: true,
    defaultValue: null,
  },
  keyid: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: null,
  },
  itemid: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: null,
  },
  description: {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: null,
  },
  colstr01: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: '_NA_',
  },
  colstr02: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: '_NA_',
  },
  colstr03: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: '_NA_',
  },
  colnum01: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue: 0,
  },
  colnum02: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    defaultValue: 0,
  },
  coldate01: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: null,
  },
  coldate02: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: null,
  },
  coltime01: {
    type: DataTypes.TIME,
    allowNull: true,
    defaultValue: null,
  },
  coltime02: {
    type: DataTypes.TIME,
    allowNull: true,
    defaultValue: null,
  },
  contact: {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: '_NA_',
  },
  address: {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: '_NA_',
  },
  city: {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: '_NA_',
  },
  postal: {
    type: DataTypes.STRING(200),
    allowNull: true,
    defaultValue: '_NA_',
  },
  markerdate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    defaultValue: null,
  },
  phone: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: '(000) 000-0000',
  },
  fax: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: '(000) 000-0000',
  },
  telex: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: '(000) 000-0000',
  },
  sstatus: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: 'ACTIVE',
  },
  pid: {
    type: DataTypes.STRING(36),
    allowNull: true,
    defaultValue: '000000',
  },
  userid: {
    type: DataTypes.STRING(20),
    allowNull: true,
    defaultValue: '_NA_',
  },
  deleted: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  }
}, {
  tableName: 'lookups',
  timestamps: false,
});

module.exports = Lookup;