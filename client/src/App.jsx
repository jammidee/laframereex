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
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { RbacProvider } from './context/RbacContext';

import LoginForm    from './views/systems/auth/LoginForm';
import Dashboard    from './views/capp/Dashboard';
import authService  from './services/auth.service';

import Hello        from '../src/views/modules/hello/Hello';


import Swal from 'sweetalert2';

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

                //==================================================
                // Sequential load required for jQuery plugins
                // Load supporting scripts for libraries being used.
                //==================================================
                await loadScript('/admin-lte/plugins/jquery/jquery.min.js');
                // await loadScript('/admin-lte/plugins/popper/umd/popper.min.js');
                await loadScript('/admin-lte/node_modules/bootstrap/dist/js/bootstrap.js');
                await loadScript('/admin-lte/dist/js/adminlte.min.js');
                // await loadScript('/admin-lte/plugins/sweetalert2/sweetalert2.all.min.js');
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
                console.log("verifySession...." + JSON.stringify(data.user) );

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

    const handleLoginSuccess = async (loginData) => {
        try {

            // 1. Ensure the token is in localStorage first
            if (loginData && loginData.token) {
                localStorage.setItem('token', loginData.token);
            }

            // 2. Run your verification service immediately to fetch the clean user profile
            const verifiedData = await authService.validateToken();
            // console.log("User profile fetched successfully post-login:", verifiedData.user);

            // 3. Commit fully validated data to state
            setUser(verifiedData.user);
            setIsAuthenticated(true);

        } catch (err) {
            console.error("Failed to safely establish session flow:", err);
            setIsAuthenticated(false);
            setUser(null);
        }
    };

    const handleLogout = () => {
        Swal.fire({
            title: 'Logout?',
            text: 'You are about to be signed out.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#aaa',
            confirmButtonText: 'Yes, logout'
        }).then((result) => {

            if (result.isConfirmed) {

                // 1. Execute back-end clean up routine
                authService.logout();

                // 2. Clear out application context memory nodes
                setIsAuthenticated(false);
                setUser(null);

                // Optional: Show a brief toast or notification if redirecting via browser
                // window.location.href = '/login';
            }
        });
    };

    if (checkingAuth) {

        return <div style={{ textRendering: 'geometricPrecision', textAlign: 'center', marginTop: '20%' }}>Validating Session...</div>;

    }

    return (
        <Router>
            <RbacProvider isAuthenticated={isAuthenticated}>
                <Routes>
                    {isAuthenticated ? (
                        <>
                            {/* Root path automatically moves to dashboard router context */}
                            <Route path="/" element={<Navigate to="/dashboard" replace />} />


                            {/* 1. If authenticated, bypass authentication interfaces and route directly to secure panel */}
                            <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} user={user} activePage="dashboard" />} />

                            {/* Additional secured routing destinations match your layout paths */}
                            <Route path="/system/entity" element={<Dashboard onLogout={handleLogout} user={user} activePage="entity" />} />
                            <Route path="/module/template" element={<Dashboard onLogout={handleLogout} user={user} activePage="template" />} />

                            {/* Modules */}
                            <Route path="/modules/hello" element={<Hello onLogout={handleLogout} user={user} activePage="hello" />} />

                            {/* Catchall safely keeps signed in context on dashboard */}
                            <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </>
                    ) : (
                        <>
                            {/* 2. Unauthenticated State: Anchor user entirely to the login boundary */}
                            <Route path="/login" element={
                                <div className="App">
                                    <LoginForm onLoginSuccess={handleLoginSuccess} />
                                </div>
                            } />

                            {/* Fallback pattern redirects missing URLs back into login terminal */}
                            <Route path="*" element={<Navigate to="/login" replace />} />
                        </>
                    )}
                </Routes>
            </RbacProvider>
        </Router>
    );
}

export default App;