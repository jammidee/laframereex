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
 * DESCRIPTION  : Frontend service for fetching entity records.
 * ------------------------------------------------------------------------
 */

const API_BASE_URL = `${CONFIG?.VITE_BASE_URL || 'http://localhost:5000'}/api/v1/systems/entity`;

class EntityClientService {
  async getEntities({ page = 1, limit = 10, search = '', sortBy = 'id', sortOrder = 'ASC' }) {
    const token = localStorage.getItem('token');
    
    const queryParams = new URLSearchParams({
      page,
      limit,
      search,
      sortBy,
      sortOrder
    });

    const response = await fetch(`${API_BASE_URL}?${queryParams.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Failed to retrieve entity list');
    }

    return data;
  }
}

export default new EntityClientService();