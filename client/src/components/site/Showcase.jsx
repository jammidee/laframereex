/**
 * ============================================================================
 * Lalulla System - Enterprise Software Solutions Boilerplate
 * Showcase Matrix Router-Entry Hub Component
 * * @author    Joel M. Damaso (Jammi Dee)
 * @company   Lalulla OPC
 * @updated   2026-06-24 13:50:00 PST
 * ============================================================================
 */

import React from 'react';

export default function Showcase() {
    return (
        <>
            <div id="showcase" className="row justify-content-center mb-5 mx-0">
                <div className="col-lg-10 text-center">
                    <h2 className="main-heading">Showcase</h2>
                    <div className="row mt-4">
                        {/* Admin Portal Gateway */}
                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm h-100 service-card">
                                <div className="card-header text-white bg-primary">
                                    <h5 className="mb-0">Admin Portal</h5>
                                </div>
                                <div className="card-body p-4 text-left d-flex flex-column justify-content-between">
                                    <div className="text-center mb-3">
                                        <a className="btn btn-primary btn-md shadow-sm w-100" href="/auth/login">Get Started - Login</a>
                                    </div>
                                    <p className="text-muted small mb-0">
                                        This page allows the user to login to the main Admin component of the framework.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Client Portal Gateway */}
                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm h-100 service-card">
                                <div className="card-header text-white bg-primary">
                                    <h5 className="mb-0">Client Portal</h5>
                                </div>
                                <div className="card-body p-4 text-left d-flex flex-column justify-content-between">
                                    <div className="text-center mb-3">
                                        <a className="btn btn-primary btn-md shadow-sm w-100" href="/auth/login">Get Started - Login as Client</a>
                                    </div>
                                    <p className="text-muted small mb-0">
                                        This page allows a client user to login to the client pages of the system, giving separate layout workflows for clients.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Framework Features Hub */}
                        <div className="col-md-4 mb-3">
                            <div className="card shadow-sm h-100 service-card">
                                <div className="card-header text-white bg-primary">
                                    <h5 className="mb-0">Framework Features</h5>
                                </div>
                                <div className="card-body p-4 text-left d-flex flex-column justify-content-between">
                                    <div className="text-center mb-3">
                                        <a className="btn btn-primary btn-md shadow-sm w-100" href="/site/features">Get Started - Visit Site</a>
                                    </div>
                                    <p className="text-muted small mb-0">
                                        This page is a showcase section allowing users to appreciate some of the decoupled framework capabilities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Framework Capabilities Statement Block */}
            <div className="row justify-content-center mb-5 mx-0">
                <div className="col-lg-10 text-center">
                    <h2 className="main-heading">Latest Framework from Lalulla</h2>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card shadow-sm h-100 service-card">
                                <div className="card-body p-4 text-left">
                                    <p className="lead text-dark">
                                        Experience the next generation of enterprise development. Engineered by Jammi Dee on a 
                                        cutting-edge Node.js and Express.js core, this framework delivers production-ready security, 
                                        structured architecture, and predictable scalability out of the box. Combined with a highly 
                                        intuitive AdminLTE-driven dashboard, it bridges the gap between rapid business deployment 
                                        and developer efficiency.
                                    </p>
                                    <p className="text-muted mb-4">
                                        The definitive enterprise application blueprint by Jammi Dee. Built on modern Node.js and 
                                        Express.js, this framework eliminates boilerplate setup by embedding robust architecture and 
                                        ironclad security directly into its core, wrapped in a polished AdminLTE interface.
                                    </p>
                                    <div className="row border-top pt-3">
                                        <div className="col-6 border-right">
                                            <strong className="text-primary d-block mb-2">Executive Value</strong>
                                            <ul className="small text-muted pl-3">
                                                <li>Faster time-to-market with ready-made architecture</li>
                                                <li>Reduced compliance risk via built-in enterprise security</li>
                                                <li>Lower total cost of ownership (TCO) and long-term maintainability</li>
                                            </ul>
                                        </div>
                                        <div className="col-6">
                                            <strong className="text-primary d-block mb-2">Developer Experience</strong>
                                            <ul className="small text-muted pl-3">
                                                <li>Clean, decoupled Node.js & Express.js module ecosystem</li>
                                                <li>Zero-turnkey setup for enterprise routing and middleware</li>
                                                <li>Fully customizable, responsive AdminLTE administration UI</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

