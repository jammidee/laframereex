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
 *
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Core application orchestrator focused exclusively on secure
 * session management, authentication, and internal Dashboard rendering.
 * ------------------------------------------------------------------------
 */

import React, { useState, useEffect } from 'react';
import LoginForm    from './views/systems/auth/LoginForm';
import Dashboard    from './views/capp/Dashboard';
import authService  from './services/auth.service';

function App() {

    //Setup session variables
    const [isAuthenticated, setIsAuthenticated]     = useState(false);
    const [checkingAuth, setCheckingAuth]           = useState(true);
    const [user, setUser]                           = useState(null);

    //===============================
    // Inject the needed JS Libraries
    //===============================
    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                // Prevent duplicate scripts if component re-renders
                if (document.querySelector(`script[src="${src}"]`)) {
                    return resolve();
                }
                const script = document.createElement('script');
                script.src = src;
                script.type = 'text/javascript';
                script.async = false; // Maintained order execution for core bindings
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Script load failure: ${src}`));
                document.body.appendChild(script);
            });
        };

        //LIbrary dependencies injection
        const injectDependencies = async () => {
            try {
                // Sequential load required for jQuery plugins
                await loadScript('/admin-lte/plugins/jquery/jquery.min.js');
                await loadScript('/admin-lte/plugins/popper/popper.min.js');
                await loadScript('/admin-lte/node_modules/bootstrap/dist/js/bootstrap.js');
                await loadScript('/admin-lte/dist/js/adminlte.min.js');
                await loadScript('/admin-lte/plugins/sweetalert2/sweetalert2.all.min.js');
                console.log("Lalulla Core Core plugins initialized successfully.");
            } catch (err) {
                console.error("Infrastructure script injection failed:", err);
            }
        };

        injectDependencies();
    }, []);


    // Validate active tokens directly on mounts,
    // check if we are still authenticated.
    useEffect(() => {

        const verifySession = async () => {
            try {

                //Reads token from localstorage during validation
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

    // 1. If authenticated, bypass authentication interfaces and route directly to secure panel
    if (isAuthenticated) {
        return <Dashboard onLogout={handleLogout} user={user} />;
    }

    // 2. Unauthenticated State: Anchor user entirely to the login boundary
    return (
        <div className="App">
            <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
    );
}

export default App;