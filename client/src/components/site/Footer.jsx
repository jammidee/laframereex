/**
 * ============================================================================
 * Lalulla System - Enterprise Software Solutions Boilerplate
 * Global Landing Footer (Un-authenticated View State)
 * * @author    Joel M. Damaso (Jammi Dee)
 * @company   Lalulla OPC
 * @updated   2026-06-24 13:50:00 PST
 * ============================================================================
 */

import React from 'react';

export default function Footer() {
    return (
        <div id="contact">
            <footer className="p-5 text-white" style={{ backgroundColor: '#000' }}>
                <div className="container">
                    <div className="row text-center text-md-left">
                        <div className="col-md-4 mb-4 mb-md-0">
                            <h5 className="text-uppercase font-weight-bold text-primary mb-3">Lalulla System</h5>
                            <p className="small text-muted">Engineering secure and scalable enterprise systems.</p>
                        </div>
                        <div className="col-md-4 mb-4 mb-md-0">
                            <h5 className="text-uppercase font-weight-bold text-primary mb-3">Contact</h5>
                            <ul className="list-unstyled small text-muted">
                                <li className="mb-2"><i className="fas fa-envelope mr-2"></i> info@lalulla.com</li>
                                <li><i className="fas fa-map-marker-alt mr-2"></i> Manila, Philippines</li>
                            </ul>
                        </div>
                        <div className="col-md-4">
                            <h5 className="text-uppercase font-weight-bold text-primary mb-3">Connect</h5>
                            <a href="#facebook" className="btn btn-sm text-white m-1" style={{ backgroundColor: '#3b5998' }}>
                                <i className="fab fa-facebook-f mr-1"></i> Facebook
                            </a>
                            <a href="#linkedin" className="btn btn-sm text-white m-1" style={{ backgroundColor: '#0e76a8' }}>
                                <i className="fab fa-linkedin-in mr-1"></i> LinkedIn
                            </a>
                        </div>
                    </div>
                    <div className="row text-center mt-4 pt-3 border-top border-secondary">
                        <div className="col-12">
                            <p className="small text-muted mb-0">
                                &copy; {new Date().getFullYear()} Lalulla OPC. All Rights Reserved. Engineered by Jammi Dee.
                            </p>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

