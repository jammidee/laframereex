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

'use strict';

const { Sequelize } = require('sequelize');
const config = require('../config/app.config');

// connect to PostgreSQL
const sequelize = new Sequelize('cloudgateone', 'postgres', 'password', {
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    benchmark: true, // Enables execution timing
    logging: async (sql, timing) => {
        if (config.sqllogging !== true) return;

        // GUARD: Prevent infinite loop by ignoring queries targeting the logs table itself
        if (sql.toLowerCase().includes('sql_sync_logs')) {
            return;
        }

        const upperSql = sql.trim().toUpperCase();

        // GUARD 2: Ignore SELECT queries as requested
        if (upperSql.startsWith('SELECT')) {
            return;
        }

        try {
            // Lazy-load inside the function to prevent circular dependency startup issues
            const { logSqlAction } = require('../helpers/sqlsynclogs.helper');

            const upperSql = sql.trim().toUpperCase();
            let actionType = 'SQL_QUERY';

            if (upperSql.startsWith('SELECT')) actionType = 'SELECT_QUERY';
            else if (upperSql.startsWith('INSERT')) actionType = 'INSERT_QUERY';
            else if (upperSql.startsWith('UPDATE')) actionType = 'UPDATE_QUERY';
            else if (upperSql.startsWith('DELETE')) actionType = 'DELETE_QUERY';

            await logSqlAction(
                null, 
                sql,
                typeof timing === 'number' ? timing : 0,
                true,
                actionType,
                '_NA_',
                'INFO'
            );
        } catch (err) {
            console.error('Failed to write SQL sync log:', err.message);
        }
    }
});

module.exports = sequelize;