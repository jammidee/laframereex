/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : August 23, 2026
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Frontend service for managing entity CRUD operations.
 * ------------------------------------------------------------------------
 */

const API_BASE_URL = `${CONFIG?.VITE_BASE_URL || 'http://localhost:5000'}/api/v1/systems/entity`;

class EntityClientService {
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
   * CREATE: Add a new entity record
   */
  async createEntity(entityData) {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(entityData)
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to create entity record');
    }

    return data;
  }

  /**
   * READ (Paginated List): Retrieve entities with filters/pagination
   */
  async getEntities({ page = 1, limit = 10, search = '', sortBy = 'id', sortOrder = 'ASC' }) {
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
      throw new Error(data.message || 'Failed to retrieve entity list');
    }

    return data;
  }

  /**
   * READ (Single): Retrieve a single entity record by ID
   */
  async getEntityById(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'GET',
      headers: this._getHeaders()
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to retrieve entity record');
    }

    return data;
  }

  /**
   * UPDATE: Modify an existing entity record by ID
   */
  async updateEntity(id, entityData) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: this._getHeaders(),
      body: JSON.stringify(entityData)
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to update entity record');
    }

    return data;
  }

  /**
   * DELETE: Remove an entity record by ID
   */
  async deleteEntity(id) {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
      headers: this._getHeaders()
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to delete entity record');
    }

    return data;
  }
}

export default new EntityClientService();