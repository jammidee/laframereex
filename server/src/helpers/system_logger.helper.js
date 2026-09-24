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
 * CREATED DATE : September 22, 2026 02:30 AM
 * ------------------------------------------------------------------------
 */

'use strict';

const config = require('../config/app.config'); // Adjust path to your config file as needed
const SystemLogService = require('../services/api/v1/systems/system_logs.service');
const systemLogService = new SystemLogService();

/**
 * Safely record a system audit log entry
 * @param {object} req - Express request object
 * @param {string} actionType - The type of action performed
 * @param {string} details - Detailed description of the action
 * @param {string} [severity='INFO'] - Log severity ('INFO', 'WARNING', 'ERROR')
 * @param {string|number} [entityId='_NA_'] - Associated entity ID or reference
 */
async function logAction(req, actionType, details, severity = 'INFO', entityId = '_NA_') {
    // Centralized configuration check: exit early if logging is disabled
    if (config.syslogging !== true) { // Or use a specific config flag like config.systemlogging if separate
        return;
    }

    try {
        await systemLogService.createLog({
            entityid: entityId ? String(entityId) : '_NA_',
            user_id: req?.user?.id || req?.body?.user_id || 0,
            action_type: actionType,
            action_details: details,
            ip_address: req?.ip || req?.connection?.remoteAddress || '127.0.0.1',
            user_agent: req?.headers?.['user-agent'] || 'Unknown',
            severity: severity
        });
    } catch (err) {
        console.error('Failed to record system log:', err.message);
    }
}

module.exports = { logAction };