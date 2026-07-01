/**
 * ============================================================================
 * Lalulla System - Enterprise Software Solutions Framework Boilerplate
 * Main Orchestrator Composite View for Landing Page Layer
 * ============================================================================
 */

import React from 'react';
import Navbar from '../../../components/site/Navbar';
import Hero from '../../../components/site/Hero';
import About from '../../../components/site/About';
import CoreValues from '../../../components/site/CoreValues';
import Services from '../../../components/site/Services';
import Showcase from '../../../components/site/Showcase';
import Footer from '../../../components/site/Footer';

import '../../../assets/css/site/LandingPage.css';

export default function LandingPage() {
    // Internal function to handle redirecting to the /index route
    const handleLoginRedirect = () => {
        window.location.href = '/index';
    };

    return (
        // <div className="hold-transition layout-top-nav adminlte-wrapper">
            // <div className="wrapper">
                <div className="content-wrapper">
                    <div className="content">
                        <div className="content-fluid">

                            {/* Embedded Component-Specific Styles */}
                            <style dangerouslySetInnerHTML={{__html: `
                                html { scroll-behavior: smooth; }
                                .service-card { transition: transform 0.3s ease, box-shadow 0.3s ease; border-radius: 12px; }
                                .service-card:hover { transform: scale(1.05); box-shadow: 0 12px 24px rgba(0,0,0,0.2); z-index: 10; }
                                .about-section { background: #fff; color: #444; font-family: 'Open Sans','Roboto',Arial,sans-serif; }
                                .about-section .tagline { text-transform: uppercase; letter-spacing: 3px; font-size: 12px; color: #999; margin-bottom: 10px; }
                                .about-section .main-heading { font-size: 42px; font-weight: 300; margin-bottom: 20px; color: #222; }
                                .about-section .lead-text { font-size: 17px; line-height: 1.7; color: #555; }
                                .video-section { position: relative; width: 100%; height: 700px; overflow: hidden; color: #fff; }
                                .video-section .nectar-video-wrap { position: absolute; width: 100%; height: 100%; top: 0; left: 0; }
                                .video-section video { width: 100%; height: 100%; object-fit: cover; }
                                .video-section .video-color-overlay { position: absolute; width: 100%; height: 100%; top: 0; left: 0; background: rgba(0,0,0,0.55); z-index: 1; }
                                .video-section .video-content { position: relative; z-index: 2; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; color: #fff; }
                                .counter { font-size: 2.5rem; font-weight: 700; }
                                .tech-icon { height: 50px; margin: 10px; filter: grayscale(0.2); transition: transform 0.3s ease; }
                                .tech-icon:hover { transform: scale(1.2); }
                            `}} />

                            {/* Pass the internal redirection handler instead of the parent prop */}
                            <Navbar onNavigateToLogin={handleLoginRedirect} />

                            <Hero />

                            <About />
                            <CoreValues />
                            <Services />
                            <Showcase />

                            <Footer />

                        </div>
                    </div>
                </div>

            // </div>
        // </div>
    );
}