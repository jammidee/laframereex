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
 * CREATED DATE : September 24, 2026 02:13 AM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Sequelize model definition for public.sql_sync_logs table.
 * ------------------------------------------------------------------------
 */

const { DataTypes } = require('sequelize');
const sequelize     = require('../../config/db');

const SqlSyncLogs = sequelize.define('SqlSyncLogs', {
    id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    entityid: {
        type: DataTypes.STRING(50),
        allowNull: true,
        defaultValue: '_NA_',
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    action_type: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: 'SQL_EXECUTION',
    },
    sql_command: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    action_details: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    execution_time_ms: {
        type: DataTypes.FLOAT,
        allowNull: true,
        defaultValue: 0,
    },
    can_replay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    sync_status: {
        type: DataTypes.STRING(36),
        allowNull: true,
        defaultValue: 'PENDING',
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    severity: {
        type: DataTypes.ENUM('INFO', 'WARNING', 'ERROR'),
        allowNull: true,
        defaultValue: 'INFO',
    },
    is_suspicious: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    sstatus: {
        type: DataTypes.STRING(36),
        allowNull: true,
        defaultValue: 'ACTIVE',
    },
    pid: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    userid: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    deleted: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    }
}, {
    tableName: 'sql_sync_logs',
    timestamps: false,
});

module.exports = SqlSyncLogs;
