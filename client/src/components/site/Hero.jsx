/**
 * ============================================================================
 * Lalulla System - Enterprise Software Solutions Boilerplate
 * Hero Section Layer Component with Background Video
 * @author    Joel M. Damaso (Jammi Dee)
 * @company   Lalulla OPC
 * @updated   2026-06-24 13:50:00 PST
 * ============================================================================
 */

import React from 'react';

export default function Hero() {
    return (
        <section className="video-section">
            <div className="video-color-overlay"></div>
            <div className="nectar-video-wrap">
                <video autoPlay loop muted playsInline>
                    <source type="video/mp4" src="https://www.w3schools.com/html/mov_bbb.mp4" />
                </video>
            </div>
            <div className="video-content">
                <h1 className="display-4 font-weight-bold">Engineering Enterprise-Grade Systems</h1>
                <p className="lead">Delivering scalable, secure and mission-critical software solutions</p>
                <br />
                <a className="btn btn-primary btn-lg shadow-sm" href="#services">Discover Our Capabilities</a>
            </div>
        </section>
    );
}

