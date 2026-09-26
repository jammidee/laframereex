/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : September 27, 2026 01:39 PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Controller routing incoming HTTP requests to UserService.
 * ------------------------------------------------------------------------
 */

'use strict';

const { logAction } = require('../../../../helpers/system_logger.helper');

class UserController {
    constructor(userService) {
        this.userService = userService;
        this.createUser  = this.createUser.bind(this);
        this.getUsers    = this.getUsers.bind(this);
        this.getUserById = this.getUserById.bind(this);
        this.updateUser  = this.updateUser.bind(this);
        this.deleteUser  = this.deleteUser.bind(this);
    }

    /**
     * Create a new user record
     */
    async createUser(req, res) {
        try {
            const data = await this.userService.createUser(req.body);

            await logAction(
                req,
                'USER_CREATE',
                `Created user record: ${data.username} (ID: ${data.id})`,
                'INFO',
                data.username || data.id
            );

            return res.status(201).json({
                success: true,
                message: 'User created successfully',
                data
            });
        } catch (error) {
            await logAction(
                req,
                'USER_CREATE_ERROR',
                `Failed to create user record: ${error.message}`,
                'ERROR'
            );

            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to create user record'
            });
        }
    }

    /**
     * Fetch paginated list of users
     */
    async getUsers(req, res) {
        try {
            const { page, limit, search, sortBy, sortOrder } = req.query;

            const result = await this.userService.getPaginatedUsers({
                page,
                limit,
                search,
                sortBy,
                sortOrder
            });

            await logAction(
                req,
                'USERS_FETCH',
                `Retrieved paginated user list (page: ${page || 1}, limit: ${limit || 10})`,
                'INFO',
                '_NA_'
            );

            return res.status(200).json({
                success: true,
                message: 'Users retrieved successfully',
                ...result
            });
        } catch (error) {
            await logAction(
                req,
                'USERS_FETCH_ERROR',
                `Failed to fetch user records: ${error.message}`,
                'ERROR'
            );

            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to fetch user records'
            });
        }
    }

    /**
     * Fetch a single user record by ID
     */
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const data = await this.userService.getUserById(id);

            if (!data) {
                await logAction(
                    req,
                    'USER_FETCH_NOT_FOUND',
                    `User record not found for ID: ${id}`,
                    'WARNING',
                    id
                );

                return res.status(404).json({
                    success: false,
                    message: 'User record not found'
                });
            }

            await logAction(
                req,
                'USER_FETCH',
                `Retrieved user record for ID: ${id}`,
                'INFO',
                data.username || id
            );

            return res.status(200).json({
                success: true,
                message: 'User retrieved successfully',
                data
            });
        } catch (error) {
            await logAction(
                req,
                'USER_FETCH_ERROR',
                `Failed to fetch user record ID ${req.params.id}: ${error.message}`,
                'ERROR',
                req.params.id
            );

            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to fetch user record'
            });
        }
    }

    /**
     * Update an existing user record by ID
     */
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const data = await this.userService.updateUser(id, req.body);

            await logAction(
                req,
                'USER_UPDATE',
                `Updated user record ID: ${id}`,
                'INFO',
                data.username || id
            );

            return res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data
            });
        } catch (error) {
            await logAction(
                req,
                'USER_UPDATE_ERROR',
                `Failed to update user record ID ${req.params.id}: ${error.message}`,
                'ERROR',
                req.params.id
            );

            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to update user record'
            });
        }
    }

    /**
     * Delete a user record by ID
     */
    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await this.userService.deleteUser(id);

            await logAction(
                req,
                'USER_DELETE',
                `Soft-deleted user record ID: ${id}`,
                'WARNING',
                id
            );

            return res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error) {
            await logAction(
                req,
                'USER_DELETE_ERROR',
                `Failed to delete user record ID ${req.params.id}: ${error.message}`,
                'ERROR',
                req.params.id
            );

            return res.status(500).json({
                success: false,
                message: error.message || 'Failed to delete user record'
            });
        }
    }
}

module.exports = UserController;