/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : September 26, 2026 12:50 AM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Frontend service for managing lookup CRUD operations.
 * ------------------------------------------------------------------------
 */

const API_BASE_URL = `${CONFIG?.VITE_BASE_URL || 'http://localhost:5000'}/api/v1/modules/lookup`;

class LookupClientService {
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
     * CREATE: Add a new lookup record
     */
    async createLookup(lookupData) {
        const payload = {
            ...lookupData,
            entityid: lookupData.entityid || 'CGONE'
        };

        const response = await fetch(`${API_BASE_URL}`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Failed to create lookup record');
        }

        return data;
    }

    /**
     * READ (Paginated List): Retrieve lookups with filters/pagination
     */
    async getLookups({ entityid = 'CGONE', keyid = '', page = 1, limit = 10, search = '', sortBy = 'id', sortOrder = 'ASC' }) {
        const queryParams = new URLSearchParams({
            entityid: entityid || 'CGONE',
            page,
            limit,
            search,
            sortBy,
            sortOrder
        });

        if (keyid) {
            queryParams.append('keyid', keyid);
        }

        const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`, {
            method: 'GET',
            headers: this._getHeaders()
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Failed to retrieve lookup list');
        }

        return data;
    }

    /**
     * READ (Single): Retrieve a single lookup record by ID
     */
    async getLookupById(id) {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'GET',
            headers: this._getHeaders()
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Failed to retrieve lookup record');
        }

        return data;
    }

    /**
     * UPDATE: Modify an existing lookup record by ID
     */
    async updateLookup(id, lookupData) {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'PUT',
            headers: this._getHeaders(),
            body: JSON.stringify(lookupData)
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Failed to update lookup record');
        }

        return data;
    }

    /**
     * DELETE: Remove a lookup record by ID
     */
    async deleteLookup(id) {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: this._getHeaders()
        });

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(data.message || 'Failed to delete lookup record');
        }

        return data;
    }
}

export default new LookupClientService();