/**
 * ============================================================================
 * Lalulla System - Enterprise Software Solutions Boilerplate
 * Services Matrix Capability Grid Component
 * * @author    Joel M. Damaso (Jammi Dee)
 * @company   Lalulla OPC
 * @updated   2026-06-24 13:50:00 PST
 * ============================================================================
 */

import React from 'react';

export default function Services() {
    return (
        <div id="services" className="row justify-content-center mb-5 mx-0">
            <div className="col-lg-10 text-center">
                <h2 className="main-heading">Our Services</h2>
                <div className="row mt-4">
                    <div className="col-md-4 mb-3">
                        <div className="card shadow-sm h-100 service-card">
                            <div className="card-header text-white bg-primary">
                                <h5 className="mb-0">Custom Software Development</h5>
                            </div>
                            <div className="card-body p-4 text-left">
                                <p className="text-muted small">
                                    We design and develop scalable enterprise applications tailored to your business processes and operational requirements.
                                </p>
                                <ul className="small text-muted pl-3">
                                    <li>Multi-tenant SaaS platforms</li>
                                    <li>Enterprise web & mobile applications</li>
                                    <li>Secure authentication & authorization systems</li>
                                    <li>Long-term maintainable architectures</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card shadow-sm h-100 service-card">
                            <div className="card-header text-white bg-primary">
                                <h5 className="mb-0">System Integration</h5>
                            </div>
                            <div className="card-body p-4 text-left">
                                <p className="text-muted small">
                                    We integrate complex systems into unified digital ecosystems ensuring seamless data flow and operational efficiency.
                                </p>
                                <ul className="small text-muted pl-3">
                                    <li>RESTful & secure API ecosystems</li>
                                    <li>Microservices architecture</li>
                                    <li>Workflow & BPM automation</li>
                                    <li>Legacy system modernization</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-4 mb-3">
                        <div className="card shadow-sm h-100 service-card">
                            <div className="card-header text-white bg-primary">
                                <h5 className="mb-0">Data Engineering</h5>
                            </div>
                            <div className="card-body p-4 text-left">
                                <p className="text-muted small">
                                    We build robust data pipelines and analytics platforms capable of handling high-volume enterprise workloads.
                                </p>
                                <ul className="small text-muted pl-3">
                                    <li>Real-time streaming (Kafka-based)</li>
                                    <li>Reporting & BI dashboards</li>
                                    <li>Data warehousing solutions</li>
                                    <li>Event-driven distributed systems</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

