/**
 * ============================================================================
 * Lalulla System - Enterprise Software Solutions Boilerplate
 * About & Expertise Sections with Dynamic React Counters
 * * @author    Joel M. Damaso (Jammi Dee)
 * @company   Lalulla OPC
 * @updated   2026-06-24 13:50:00 PST
 * ============================================================================
 */

import React, { useEffect, useState } from 'react';

// Reusable Counter Hook for pure React implementation bypassing legacy jQuery animations
const CounterItem = ({ target, duration = 2000, title }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(target, 10);
        if (start === end) return;

        let totalMiliseconds = duration;
        let incrementTime = Math.abs(Math.floor(totalMiliseconds / end));
        
        let timer = setInterval(() => {
            start += 1;
            setCount(start);
            if (start === end) clearInterval(timer);
        }, incrementTime);

        return () => clearInterval(timer);
    }, [target, duration]);

    return (
        <div className="col-md-3 mb-3">
            <div className="counter text-primary">{count}</div>
            <p className="font-weight-bold text-muted">{title}</p>
        </div>
    );
};

export default function About() {
    return (
        <>
            {/* Section: Who We Are */}
            <section id="who" className="about-section py-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                            <p className="tagline">Building Digital Infrastructure</p>
                            <h2 className="main-heading">Who We Are</h2>
                            <p className="lead-text">
                                Lalulla System is a technology-driven software development company 
                                specializing in enterprise systems, financial platforms, workflow automation, 
                                API integrations, and high-volume data processing environments. 
                                Our solutions are designed for scalability, maintainability, and long-term operational stability.
                            </p>
                        </div>
                        <div className="col-lg-6 text-center">
                            <img 
                                className="img-fluid rounded shadow-sm"
                                src="https://images.unsplash.com/photo-1551434678-e076c223a692"
                                style={{ maxHeight: '350px', objectFit: 'cover', width: '100%' }}
                                alt="Team Working"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Section: Our Expertise */}
            <section id="expertise" className="about-section py-5" style={{ background: '#f8f9fa' }}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 text-center">
                            <img 
                                className="img-fluid rounded shadow-sm"
                                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c"
                                style={{ maxHeight: '350px', objectFit: 'cover', width: '100%' }}
                                alt="Developer Desk"
                            />
                        </div>
                        <div className="col-lg-6">
                            <p className="tagline">Enterprise Specialization</p>
                            <h2 className="main-heading">Our Expertise</h2>
                            <div className="lead-text">
                                <p className="mb-2">We architect and develop:</p>
                                <ul className="list-unstyled pl-2">
                                    <li><i className="fas fa-check text-success mr-2"></i> Large-scale multi-tenant systems</li>
                                    <li><i className="fas fa-check text-success mr-2"></i> Workflow and BPM-driven platforms</li>
                                    <li><i className="fas fa-check text-success mr-2"></i> Data streaming and event-driven architectures</li>
                                    <li><i className="fas fa-check text-success mr-2"></i> Secure API ecosystems</li>
                                    <li><i className="fas fa-check text-success mr-2"></i> Government and financial enterprise applications</li>
                                </ul>
                                <p className="small text-muted mt-3">
                                    Our team leverages modern stacks including Node.js, Java, MySQL, Kafka, cloud-native technologies, and containerized deployments.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Animated Counters Grid */}
                    <div className="row text-center mt-5 pt-4 border-top">
                        <CounterItem target="150" title="Projects Delivered" />
                        <CounterItem target="95" title="Satisfied Clients" />
                        <CounterItem target="50" title="Ongoing Projects" />
                        <CounterItem target="10" title="Years of Experience" />
                    </div>
                </div>
            </section>
        </>
    );
}

