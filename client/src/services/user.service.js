/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : September 27, 2026
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Frontend service for managing user CRUD operations.
 * ------------------------------------------------------------------------
 */

const API_BASE_URL = `${CONFIG?.VITE_BASE_URL || 'http://localhost:5000'}/api/v1/systems/user`;

class UserClientService {
    /**
     * Helper to append auth headers consistently across requests.
     */
    _getHeaders() {
        const token = localStorage.getItem('token');
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        };
    }

    /**
     * CREATE: Add a new user record
     */
    async createUser(userData) {
        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Failed to create user record');
        }

        return data;
    }

    /**
     * READ (Paginated List): Retrieve users with filters/pagination
     */
    async getUsers({ page = 1, limit = 10, search = '', sortBy = 'created_at', sortOrder = 'DESC' } = {}) {
        const queryParams = new URLSearchParams({
            page,
            limit,
            search,
            sortBy,
            sortOrder
        });

        const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`, {
            method: 'GET',
            headers: this._getHeaders()
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Failed to retrieve user list');
        }

        return data;
    }

    /**
     * READ (Single): Retrieve a single user record by ID
     */
    async getUserById(id) {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'GET',
            headers: this._getHeaders()
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Failed to retrieve user record');
        }

        return data;
    }

    /**
     * UPDATE: Modify an existing user record by ID
     */
    async updateUser(id, userData) {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: this._getHeaders(),
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Failed to update user record');
        }

        return data;
    }

    /**
     * DELETE: Remove a user record by ID
     */
    async deleteUser(id) {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders()
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Failed to delete user record');
        }

        return data;
    }
}

export default new UserClientService();
