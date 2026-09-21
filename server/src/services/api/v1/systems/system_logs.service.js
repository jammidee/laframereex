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
 * CREATED DATE : September 22, 2026
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Service layer handling business logic and query execution
 * for system logs management.
 * ------------------------------------------------------------------------
 */

'use strict';

const { Op } = require('sequelize');
const SystemLog = require('../../../../models/systems/system_logs.model');

class SystemLogService {

    /**
     * Create a new system log record
     */
    async createLog(payload) {
        const newLog = await SystemLog.create(payload);
        return newLog;
    }

    /**
     * Fetch paginated system log records matching DataTable search & sorting requirements
     */
    async getPaginatedLogs(params = {}) {
        const {
            page = 1,
            limit = 10,
            search = '',
            sortBy = 'created_at',
            sortOrder = 'DESC',
            severity = '',
            action_type = ''
        } = params;

        const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

        // Build search predicate
        const whereClause = {
            deleted: 0
        };

        if (severity && severity.trim() !== '') {
            whereClause.severity = severity.trim();
        }

        if (action_type && action_type.trim() !== '') {
            whereClause.action_type = action_type.trim();
        }

        if (search && search.trim() !== '') {
            const query = `%${search.trim()}%`;
            whereClause[Op.or] = [
                { action_type: { [Op.iLike]: query } },
                { action_details: { [Op.iLike]: query } },
                { ip_address: { [Op.iLike]: query } },
                { entityid: { [Op.iLike]: query } }
            ];
        }

        // Execute query with count
        const { count, rows } = await SystemLog.findAndCountAll({
            where: whereClause,
            limit: parseInt(limit, 10),
            offset: parseInt(offset, 10),
            order: [[sortBy, sortOrder.toUpperCase()]]
        });

        return {
            totalRecords: count,
            totalPages: Math.ceil(count / limit),
            currentPage: parseInt(page, 10),
            data: rows
        };
    }

    /**
     * Fetch single system log by ID
     */
    async getLogById(id) {
        return await SystemLog.findOne({
            where: { id, deleted: 0 }
        });
    }

    /**
     * Soft delete a system log record by setting deleted flag to 1
     */
    async deleteLog(id) {
        const log = await this.getLogById(id);

        if (!log) {
            throw new Error('System log record not found');
        }

        await log.update({ deleted: 1 });
        return true;
    }
}

module.exports = SystemLogService;