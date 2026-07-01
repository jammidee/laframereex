/**
 * ============================================================================
 * Lalulla System - Enterprise Software Solutions Boilerplate
 * Core Values Deck Layout Component
 * * @author    Joel M. Damaso (Jammi Dee)
 * @company   Lalulla OPC
 * @updated   2026-06-24 13:50:00 PST
 * ============================================================================
 */

import React from 'react';

export default function CoreValues() {
    return (
        <div id="core-values" className="row justify-content-center mb-5 bg-white p-4 rounded shadow-sm mx-0">
            <div className="col-lg-10 text-center">
                <p className="tagline">Our Foundation</p>
                <h2 className="main-heading">Our Core Values</h2>
                <div className="row mt-4">
                    <div className="col-md-4 mb-3">
                        <div className="card shadow-sm h-100 service-card">
                            <div className="card-header text-white bg-primary">
                                <h5 className="mb-0">Custom Software Development</h5>
                            </div>
                            <div className="card-body text-left">
                                <p className="card-text text-muted">
                                    We design and build scalable enterprise applications tailored to complex business environments, ensuring long-term stability, security, and maintainability.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card shadow-sm h-100 service-card">
                            <div className="card-header text-white bg-primary">
                                <h5 className="mb-0">System Integration</h5>
                            </div>
                            <div className="card-body text-left">
                                <p className="card-text text-muted">
                                    We integrate platforms, APIs, and distributed systems into unified digital ecosystems that streamline operations and improve data-driven decision making.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card shadow-sm h-100 service-card">
                            <div className="card-header text-white bg-primary">
                                <h5 className="mb-0">Data Engineering</h5>
                            </div>
                            <div className="card-body text-left">
                                <p className="card-text text-muted">
                                    We architect high-performance data pipelines and real-time processing environments designed to handle enterprise-scale analytics and reporting workloads.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

