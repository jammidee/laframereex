/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * PRODUCT NAME : Lalulla React Client Framework
 * AUTHOR       : Gemini (AI Collaborator)
 * CREATED DATE : June 23, 2026 11:00 PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Application orchestrator executing entry evaluation tasks
 * and conditionally managing component rendering.
 * ------------------------------------------------------------------------
 */

import React, { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';
import authService from './services/auth.service';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [user, setUser] = useState(null);

  // Validate active tokens directly on mounts
  useEffect(() => {
    const verifySession = async () => {
      try {
        const data = await authService.validateToken();
        setIsAuthenticated(true);
        setUser(data.user);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setCheckingAuth(false);
      }
    };

    verifySession();
  }, []);

  const handleLoginSuccess = (data) => {
    setIsAuthenticated(true);
    // Explicitly set structural user details if returned from verification state
    setUser(data.user || null);
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
    setUser(null);
  };

  if (checkingAuth) {
    return <div style={{ textRendering: 'geometricPrecision', textAlign: 'center', marginTop: '20%' }}>Validating Session...</div>;
  }

  return (
    <div className="App">
      {isAuthenticated ? (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <h1>Welcome to Lalulla Secure Hub</h1>
          <p>Authenticated Session Validated.</p>
          <button 
            onClick={handleLogout} 
            style={{ padding: '0.5rem 1rem', background: '#dc3545', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
          >
            Logout
          </button>
        </div>
      ) : (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}
    </div>
  );
}

export default App;