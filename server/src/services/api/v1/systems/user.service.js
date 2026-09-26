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
 * CREATED DATE : September 27, 2026
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Service layer handling business logic and query execution
 * for user management.
 * ------------------------------------------------------------------------
 */

'use strict';

const crypto = require('crypto');
const { Op } = require('sequelize');
const User   = require('../../../../models/systems/user.model');

class UserService {

    /**
     * Create a new user record
     */
    async createUser(payload) {
        const userData = {
            ...payload,
            juid: payload.juid || crypto.randomUUID()
        };

        const newUser = await User.create(userData);
        return newUser;
    }

    /**
     * Fetch paginated user records matching DataTable search & sorting requirements
     */
    async getPaginatedUsers(params = {}) {
        const {
            page = 1,
            limit = 10,
            search = '',
            sortBy = 'created_at',
            sortOrder = 'DESC'
        } = params;

        const offset = (parseInt(page, 10) - 1) * parseInt(limit, 10);

        // Build search predicate
        const whereClause = {};

        if (search && search.trim() !== '') {
            const query = `%${search.trim()}%`;
            whereClause[Op.or] = [
                { username: { [Op.iLike]: query } },
                { email: { [Op.iLike]: query } },
                { firstname: { [Op.iLike]: query } },
                { lastname: { [Op.iLike]: query } },
                { status: { [Op.iLike]: query } }
            ];
        }

        // Execute query with count
        const { count, rows } = await User.findAndCountAll({
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
     * Fetch single user by ID
     */
    async getUserById(id) {
        return await User.findOne({
            where: { id }
        });
    }

    /**
     * Update an existing user record by ID
     */
    async updateUser(id, payload) {
        const user = await this.getUserById(id);

        if (!user) {
            throw new Error('User record not found');
        }

        await user.update(payload);
        return user;
    }

    /**
     * Soft delete a user record using paranoid/deleted_at
     */
    async deleteUser(id) {
        const user = await this.getUserById(id);

        if (!user) {
            throw new Error('User record not found');
        }

        await user.destroy();
        return true;
    }
}

module.exports = UserService;