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
 * CREATED DATE : September 24, 2026 02:25 AM
 * ------------------------------------------------------------------------
 */

'use strict';

const SqlSyncLogsService = require('../services/api/v1/systems/sqlsynclogs.service');
const sqlSyncLogsService = new SqlSyncLogsService();

/**
 * Safely record an SQL sync log entry for later replay or replication
 * @param {object} req - Express request object (optional)
 * @param {string} sqlCommand - The SQL command executed in the system
 * @param {number} [executionTimeMs=0] - Execution time in milliseconds
 * @param {boolean} [canReplay=true] - Flag indicating whether the command can be replayed
 * @param {string} [actionType='SQL_EXECUTION'] - The type of action performed
 * @param {string|number} [entityId='_NA_'] - Associated entity ID or reference
 * @param {string} [severity='INFO'] - Log severity ('INFO', 'WARNING', 'ERROR')
 */
async function logSqlAction(req, sqlCommand, executionTimeMs = 0, canReplay = true, actionType = 'SQL_EXECUTION', entityId = '_NA_', severity = 'INFO') {
    try {
        await sqlSyncLogsService.createSqlSyncLog({
            entityid: entityId ? String(entityId) : '_NA_',
            user_id: req?.user?.id || req?.body?.user_id || 0,
            action_type: actionType,
            sql_command: sqlCommand,
            execution_time_ms: executionTimeMs,
            can_replay: canReplay,
            severity: severity,
            sync_status: 'PENDING'
        });
    } catch (err) {
        console.error('Failed to record SQL sync log:', err.message);
    }
}

module.exports = { logSqlAction };