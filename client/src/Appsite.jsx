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
 * CREATED DATE : June 23, 2026 11:00 PM
 * ------------------------------------------------------------------------
 *
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Application orchestrator managing public infrastructure
 * script injection and landing interface mounting.
 * ------------------------------------------------------------------------
 */

import React, { useEffect } from 'react';
import LandingPage from './views/systems/site/LandingPage';

function AppSite() {

    //===============================
    // Inject the needed JS Libraries
    //===============================
    useEffect(() => {
        const loadScript = (src) => {
            return new Promise((resolve, reject) => {
                // Prevent duplicate scripts if component re-renders
                if (document.querySelector(`script[src="${src}"]`)) {
                    return resolve();
                }
                const script = document.createElement('script');
                script.src = src;
                script.type = 'text/javascript';
                script.async = false; // Maintained order execution for core bindings
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Script load failure: ${src}`));
                document.body.appendChild(script);
            });
        };

        const injectDependencies = async () => {
            try {
                // Sequential load required for jQuery plugins
                await loadScript('/admin-lte/plugins/jquery/jquery.min.js');
                await loadScript('/admin-lte/plugins/popper/popper.min.js');
                await loadScript('/admin-lte/node_modules/bootstrap/dist/js/bootstrap.js');
                await loadScript('/admin-lte/dist/js/adminlte.min.js');
                // await loadScript('/admin-lte/plugins/sweetalert2/sweetalert2.all.min.js');
                console.log("Lalulla Core Core plugins initialized successfully.");
            } catch (err) {
                console.error("Infrastructure script injection failed:", err);
            }
        };

        injectDependencies();
    }, []);

    // Directly render the landing interface wrapped in Appsite class
    return (
        <div className="site">
            <LandingPage />
        </div>
    );
}

export default AppSite;