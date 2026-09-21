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
 * CREATED DATE : July 04, 2026 03:05 PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Refactored AdminLTE Top Navigation Component.
 * ------------------------------------------------------------------------
 */

import React from 'react';

function LaNavigation({ user, onLogout }) {

    // console.log("User inside LaNavigation...." + JSON.stringify(user?.firstname) );
    
    const handleLogoutClick = (e) => {

        e.preventDefault();
        if (onLogout) onLogout();

    };

    return (
        <nav className="main-header navbar navbar-expand navbar-white navbar-light">
            {/* Left navbar links */}
            <ul className="navbar-nav">
                <li className="nav-item">
                    <a className="nav-link" data-widget="pushmenu" href="#" role="button">
                        <i className="fas fa-bars" />
                    </a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a className="nav-link" href="/">Home</a>
                </li>
                <li className="nav-item d-none d-sm-inline-block">
                    <a className="nav-link" href="#">Contact</a>
                </li>
                <li className="nav-item dropdown">
                    <a 
                        className="nav-link dropdown-toggle" 
                        href="#" 
                        id="navbarDropdown2" 
                        role="button" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"
                    >
                        Help
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown2">
                        <a className="dropdown-item" href="#">FAQ</a>
                        <a className="dropdown-item" href="#">Support</a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">Contact</a>
                    </div>
                </li>
            </ul>

            {/* SEARCH FORM */}
            <form className="form-inline ml-3">
                <div className="input-group input-group-sm">
                    <input className="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search" />
                    <div className="input-group-append">
                        <button className="btn btn-navbar" type="submit">
                            <i className="fas fa-search" />
                        </button>
                    </div>
                </div>
            </form>

            {/* Right navbar links */}
            <ul className="navbar-nav ml-auto">
                {/* Messages Dropdown Menu */}
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-comments" />
                        <span className="badge badge-danger navbar-badge">3</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <a className="dropdown-item" href="#">
                            {/* Message Start */}
                            <div className="media">
                                <img className="img-size-50 mr-3 img-circle" src="/resources/images/logos/logo160.png" alt="User Avatar" />
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        Brad Diesel
                                        <span className="float-right text-sm text-danger">
                                            <i className="fas fa-star" />
                                        </span>
                                    </h3>
                                    <p className="text-sm">Call me whenever you can...</p>
                                    <p className="text-sm text-muted">
                                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                                    </p>
                                </div>
                            </div>
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">
                            {/* Message Start */}
                            <div className="media">
                                <img className="img-size-50 img-circle mr-3" src="/resources/images/logos/logo160.png" alt="User Avatar" />
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        John Pierce
                                        <span className="float-right text-sm text-muted">
                                            <i className="fas fa-star" />
                                        </span>
                                    </h3>
                                    <p className="text-sm">I got your message bro</p>
                                    <p className="text-sm text-muted">
                                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                                    </p>
                                </div>
                            </div>
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">
                            {/* Message Start */}
                            <div className="media">
                                <img className="img-size-50 img-circle mr-3" src="/resources/images/logos/logo160.png" alt="User Avatar" />
                                <div className="media-body">
                                    <h3 className="dropdown-item-title">
                                        Nora Silvester
                                        <span className="float-right text-sm text-warning">
                                            <i className="fas fa-star" />
                                        </span>
                                    </h3>
                                    <p className="text-sm">The subject goes here</p>
                                    <p className="text-sm text-muted">
                                        <i className="far fa-clock mr-1" /> 4 Hours Ago
                                    </p>
                                </div>
                            </div>
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item dropdown-footer" href="#">See All Messages</a>
                    </div>
                </li>

                {/* Notifications Dropdown Menu */}
                <li className="nav-item dropdown">
                    <a className="nav-link" data-toggle="dropdown" href="#">
                        <i className="far fa-bell" />
                        <span className="badge badge-warning navbar-badge">15</span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                        <span className="dropdown-header">15 Notifications</span>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-envelope mr-2" /> 4 new messages
                            <span className="float-right text-muted text-sm">3 mins</span>
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-users mr-2" /> 8 friend requests
                            <span className="float-right text-muted text-sm">12 hours</span>
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">
                            <i className="fas fa-file mr-2" /> 3 new reports
                            <span className="float-right text-muted text-sm">2 days</span>
                        </a>
                        <div className="dropdown-divider" />
                        <a className="dropdown-item dropdown-footer" href="#">See All Notifications</a>
                    </div>
                </li>

                {/* Fullscreen Option */}
                <li className="nav-item">
                    <a className="nav-link" data-widget="fullscreen" href="#" role="button">
                        <i className="fas fa-expand-arrows-alt" />
                    </a>
                </li>

                {/* User profile */}
                <li className="nav-item dropdown user-menu">
                    <a 
                        className="nav-link dropdown-toggle d-flex align-items-center" 
                        href="#" 
                        id="navbarDropdown2"
                        role="button" 
                        data-toggle="dropdown" 
                        aria-haspopup="true" 
                        aria-expanded="false"
                    >
                        <img 
                            className="img-circle" 
                            src="/resources/images/logos/logo160.png" 
                            alt="User Image" 
                            style={{ width: '32px', height: '32px', objectFit: 'cover' }} 
                        />
                        <span className="d-none d-md-inline ml-2">
                            {user?.firstname || 'User'}
                        </span>
                    </a>
                    <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown2">
                        <a className="dropdown-item" href="/profile">
                            <i className="fas fa-user mr-2" /> My Profile
                        </a>
                        <a className="dropdown-item" href="/change-password">
                            <i className="fas fa-key mr-2" /> Change Password
                        </a>
                        <a className="dropdown-item" href="/preferences">
                            <i className="fas fa-cog mr-2" /> Preferences
                        </a>
                        <div className="dropdown-divider" />
                        <a className="nav-link logout-btn" href="#" onClick={handleLogoutClick}>
                            <i className="fas fa-sign-out-alt mr-2" /> Logout
                        </a>
                    </div>
                </li>

                {/* Rightbar Context menu */}
                <li className="nav-item">
                    <a className="nav-link" data-widget="control-sidebar" data-slide="true" href="#" role="button">
                        <i className="fas fa-th-large" />
                    </a>
                </li>
            </ul>
        </nav>
    );
}

export default LaNavigation;