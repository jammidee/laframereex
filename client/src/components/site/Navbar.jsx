/**
 * ============================================================================
 * Lalulla System - Enterprise Software Solutions Framework Boilerplate
 * Master Core Header / Nav Layout (Horizontal Flex Row Enforcement)
 * ============================================================================
 */

import React from 'react';

export default function Navbar({ onNavigateToLogin }) {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4 rounded shadow-sm">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center" href="#">
                    <img src="/resources/images/logos/logo160.png" style={{ height: '30px', marginRight: '10px' }} alt="Lalulla System Logo" />
                    <span>Lalulla System</span>
                </a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" 
                    data-target="#mainNavbar" 
                    aria-controls="mainNavbar" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse justify-content-end" id="mainNavbar">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" href="#who">Who We Are</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#expertise">Our Expertise</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#core-values">Core Values</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#services">Services</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#showcase">Show Case</a>
                        </li>
                        {/* <li className="nav-item">
                            <a className="nav-link" href="/auth/login">Client Login</a>
                        </li> */}
                        {/* Direct Button Trigger mapped next to the items in line */}
                        <li className="nav-item">
                            <a 
                                className="nav-link" 
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onNavigateToLogin();
                                }}
                            >
                                Client Login
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}