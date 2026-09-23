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
 * CREATED DATE : September 24, 2026
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Service layer handling business logic and query execution
 * for sql sync logs management.
 * ------------------------------------------------------------------------
 */

'use strict';

const { Op } = require('sequelize');
const SqlSyncLogs = require('../../../../models/systems/sqlsynclogs.model');

class SqlSyncLogsService {

    /**
     * Create a new SQL sync log record
     */
    async createSqlSyncLog(payload) {
        const logData = {
            ...payload
        };

        const newLog = await SqlSyncLogs.create(logData);
        return newLog;
    }

    /**
     * Fetch paginated SQL sync log records matching DataTable search & sorting requirements
     */
    async getPaginatedSqlSyncLogs(params = {}) {
        const {
            page = 1,
            limit = 10,
            search = '',
            sortBy = 'created_at',
            sortOrder = 'DESC'
        } = params;

        const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

        // Build search predicate
        const whereClause = {
            deleted: 0
        };

        if (search && search.trim() !== '') {
            const query = `%${search.trim()}%`;
            whereClause[Op.or] = [
                { action_type: { [Op.iLike]: query } },
                { sync_status: { [Op.iLike]: query } },
                { entityid: { [Op.iLike]: query } }
            ];
        }

        // Execute query with count
        const { count, rows } = await SqlSyncLogs.findAndCountAll({
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
     * Fetch single SQL sync log by ID
     */
    async getSqlSyncLogById(id) {
        return await SqlSyncLogs.findOne({
            where: { id, deleted: 0 }
        });
    }

    /**
     * Update an existing SQL sync log record by ID
     */
    async updateSqlSyncLog(id, payload) {
        const logRecord = await this.getSqlSyncLogById(id);

        if (!logRecord) {
            throw new Error('SQL sync log record not found');
        }

        await logRecord.update(payload);
        return logRecord;
    }

    /**
     * Soft delete an SQL sync log record by setting deleted flag to 1
     */
    async deleteSqlSyncLog(id) {
        const logRecord = await this.getSqlSyncLogById(id);

        if (!logRecord) {
            throw new Error('SQL sync log record not found');
        }

        await logRecord.update({ deleted: 1 });
        return true;
    }
}

module.exports = SqlSyncLogsService;
