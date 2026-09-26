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
 * CREATED DATE : September 27, 2026 01:12 PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Sequelize model definition for public.users table.
 * ------------------------------------------------------------------------
 */

const { DataTypes } = require('sequelize');
const sequelize     = require('../../config/db');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    juid: {
        type: DataTypes.CHAR(36),
        allowNull: false,
        unique: true,
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
        comment: '1=Male, 2=Female, 3=Other',
    },
    store_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
    },
    region: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    regiondesc: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    province: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    provincedesc: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    municipal: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    municipaldesc: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    brgy: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    brgydesc: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'ACTIVE',
    },
    roleid: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'USER',
    },
    entityid: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'CGONE',
    },
    last_login_at: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    deleted_at: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
});

module.exports = User;