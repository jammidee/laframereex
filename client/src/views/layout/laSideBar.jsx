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
 * CREATED DATE : June 30, 2026 2:15 AM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Refactored AdminLTE Sidebar Navigation Component.
 * ------------------------------------------------------------------------
 */

import React, { useState } from 'react';
import Swal from 'sweetalert2';
// Maintained original path since file lives in src/views/layout/laSideBar.jsx
import { useRbac } from '../../context/RbacContext';

function LaSideBar({ user, activePage, onLogout }) {
    // 1. SAFELY acquire the context object
    const rbac = useRbac();

    // 2. DEFENSIVE GUARD: If context is resolving or null, fallback gracefully
    const can = rbac && typeof rbac.can === 'function' ? rbac.can : () => false;

    // Toggle state for the expandable AdminLTE menu dropdowns
    const [isStarterOpen, setIsStarterOpen] = useState(false);

    // Helper function to handle link navigation safely
    const handleNavigation = (e, url) => {
        e.preventDefault();
        window.location.href = url;
    };
    
    const handleLogoutClick = (e) => {
        
        e.preventDefault();
        if (onLogout) {
            onLogout();
        }
        
    };

    // Helper function supporting the hook structure with standard fallback safety
    const hasPermission = (permissionId) => {
        if (typeof can === 'function') {
            return can(permissionId);
        }
        return false; // Hide menu items until permissions are loaded from API
    };

    return (
        <aside className="main-sidebar sidebar-light-yellow elevation-2">
            {/* Brand Logo */}
            <a href="/dashboard" className="brand-link" onClick={(e) => handleNavigation(e, '/dashboard')}>
                <img 
                    src="/resources/images/logos/logo160.png" 
                    alt="AdminLTE Logo" 
                    className="brand-image img-circle elevation-1" 
                    style={{ opacity: 0.8 }} 
                />
                <span className="brand-text font-weight-light">Lalulla</span>
            </a>

            {/* Sidebar Content */}
            <div className="sidebar">
                {/* Sidebar Menu */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu">

                        {hasPermission('dashboard_manage') && (
                            <li className="nav-item">
                                <a 
                                    href="#" 
                                    className={`nav-link ${activePage === 'dashboard' ? 'active' : ''}`}
                                    onClick={(e) => handleNavigation(e, '/dashboard')}
                                >
                                    <i className="nav-icon fas fa-th" />
                                    <p>Dashboard</p>
                                </a>
                            </li>
                        )}

                        {hasPermission('template_manage') && (
                            <li className="nav-item">
                                <a 
                                    href="#" 
                                    className={`nav-link ${activePage === 'template' ? 'active' : ''}`}
                                    onClick={(e) => handleNavigation(e, '/module/template')}
                                >
                                    <i className="nav-icon fas fa-columns" />
                                    <p>Template</p>
                                </a>
                            </li>
                        )}

                        {/* Treeview Menu: Starter Pages */}
                        <li className={`nav-item ${isStarterOpen ? 'menu-open' : 'menu-close'}`}>
                            <a 
                                href="#" 
                                className="nav-link" 
                                onClick={(e) => { e.preventDefault(); setIsStarterOpen(!isStarterOpen); }}
                            >
                                <i className="nav-icon fas fa-tachometer-alt" />
                                <p>
                                    Starter Pages
                                    <i className="right fas fa-angle-left" />
                                </p>
                            </a>
                            <ul className="nav nav-treeview" style={{ display: isStarterOpen ? 'block' : 'none' }}>
                                <li className="nav-item">
                                    <a href="#" className="nav-link active" onClick={(e) => e.preventDefault()}>
                                        <i className="far fa-circle nav-icon" />
                                        <p>Active Page</p>
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
                                        <i className="far fa-circle nav-icon" />
                                        <p>Inactive Page</p>
                                    </a>
                                </li>
                            </ul>
                        </li>

                        {hasPermission('dashboard_manage') && (
                            <li className="nav-item">
                                <a href="#" className="nav-link" onClick={(e) => e.preventDefault()}>
                                    <i className="nav-icon fas fa-file-alt" />
                                    <p>
                                        Simple Link
                                        <span className="right badge badge-danger">New</span>
                                    </p>
                                </a>
                            </li>
                        )}

                        <li className="nav-header">Administration</li>

                        {hasPermission('template_manage') && (
                            <li className="nav-item">
                                <a 
                                    href="#" 
                                    className={`nav-link ${activePage === 'template' ? 'active' : ''}`}
                                    onClick={(e) => handleNavigation(e, '/system/entity')}
                                >
                                    <i className="nav-icon fas fa-building" />
                                    <p>Entity</p>
                                </a>
                            </li>
                        )}

                        {hasPermission('template_manage') && (
                            <li className="nav-item">
                                <a 
                                    href="#" 
                                    className={`nav-link ${activePage === 'template' ? 'active' : ''}`}
                                    onClick={(e) => handleNavigation(e, '/module/template')}
                                >
                                    <i className="nav-icon fas fa-list-ul" />
                                    <p>Lookup</p>
                                </a>
                            </li>
                        )}

                        {hasPermission('template_manage') && (
                            <li className="nav-item">
                                <a 
                                    href="#" 
                                    className={`nav-link ${activePage === 'template' ? 'active' : ''}`}
                                    onClick={(e) => handleNavigation(e, '/system/hello')}
                                >
                                    <i className="nav-icon fas fa-info-circle" />
                                    <p>About</p>
                                </a>
                            </li>
                        )}

                        <li className="nav-item">
                            <hr className="sidebar-divider" style={{ borderTop: '1px solid rgba(0,0,0,.1)' }} />
                        </li>

                        <li className="nav-header">System</li>

                        <li className="nav-item">
                            <a 
                                href="#" 
                                className="nav-link la-custom-logout" 
                                onClick={handleLogoutClick}
                            >
                                <i className="nav-icon fas fa-sign-out-alt" />
                                <p>Logout</p>
                            </a>
                        </li>

                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default LaSideBar;