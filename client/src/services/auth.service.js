/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso)
 * This file is part of the Lalulla System.
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : June 23, 2026 11:00 PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Service layer handling authentication requests, local
 * storage management, and Basic Authorization header encoding.
 * ------------------------------------------------------------------------
 */

const API_BASE_URL = 'http://localhost:5000/api/v1/systems/auth'; // Adjust your port/domain as needed

class ClientAuthService {
  /**
   * Send credentials using Basic Authorization header format
   * @param {string} username 
   * @param {string} password 
   * @returns {Promise<object>} response data containing JWT token
   */
  async login(username, password) {
    // Generate Base64 encoded string: btoa("username:password")
    const credentials = btoa(`${username.trim()}:${password.trim()}`);

    const response = await fetch(`${API_BASE_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${credentials}`
      }
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'Authentication failed');
    }

    // Secure token locally if successfully verified
    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  }

  /**
   * Validate token against the protected route
   * @returns {Promise<object>} validation status and user payload
   */
  async validateToken() {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/validate`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}` // Assumes your jwt.middleware expects Bearer token
      }
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      this.logout();
      throw new Error(data.message || 'Session expired');
    }

    return data;
  }

  /**
   * Terminate session locally
   */
  logout() {
    localStorage.removeItem('token');
  }
}

export default new ClientAuthService();