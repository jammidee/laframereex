/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla React Client Framework
 * AUTHOR       : Gemini (AI Collaborator)
 * CREATED DATE : June 23, 2026 11:00 PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Controlled Login form component supporting user interactions
 * and binding to the ClientAuthService layer.
 * ------------------------------------------------------------------------
 */

import React, { useState } from 'react';
import authService from '../services/auth.service';

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const data = await authService.login(username, password);
      // Pass data/token upwards on successful resolution
      onLoginSuccess(data);
    } catch (err) {
      // Capture and display contextual error string from backend response
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Lalulla System Login</h2>
        
        {error && <div style={styles.error}>{error}</div>}
        
        <div style={styles.inputGroup}>
          <label htmlFor="username">Username or Email</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            disabled={loading}
            style={styles.input}
          />
        </div>

        <div style={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
            style={styles.input}
          />
        </div>

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Authenticating...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

// Simple embedded layout styling rules
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f5f5f5' },
  form: { padding: '2rem', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  title: { textAlign: 'center', marginBottom: '1.5rem', color: '#333' },
  inputGroup: { marginBottom: '1rem', display: 'flex', flexDirection: 'column' },
  input: { padding: '0.5rem', marginTop: '0.25rem', fontSize: '1rem', borderRadius: '4px', border: '1px solid #ccc' },
  button: { width: '100%', padding: '0.75rem', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '1rem', marginTop: '1rem' },
  error: { padding: '0.5rem', marginBottom: '1rem', color: '#721c24', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px', textAlign: 'center' }
};

export default LoginForm;