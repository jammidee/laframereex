/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 * DESCRIPTION : Dynamic script and plugin loader utility for AdminLTE infrastructure.
 * ------------------------------------------------------------------------
 */

const loadScript = (src) => {
    return new Promise((resolve, reject) => {
        // Prevent duplicate scripts if component re-renders
        if (document.querySelector(`script[src="${src}"]`)) {
            return resolve();
        }
        const script = document.createElement('script');
        script.src = src;
        script.type = 'text/javascript';
        script.async = false; // Maintain execution order for core bindings
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Script load failure: ${src}`));
        document.body.appendChild(script);
    });
};

export const injectCorePlugins = async () => {
    try {
        // ==================================================
        // Sequential load required for jQuery plugins
        // Load supporting scripts for libraries being used.
        // ==================================================
        await loadScript('/admin-lte/plugins/jquery/jquery.min.js');
        // await loadScript('/admin-lte/plugins/popper/umd/popper.min.js');
        await loadScript('/admin-lte/node_modules/bootstrap/dist/js/bootstrap.js');
        await loadScript('/admin-lte/dist/js/adminlte.min.js');
        // await loadScript('/admin-lte/plugins/sweetalert2/sweetalert2.all.min.js');
        
        console.log("Lalulla Core plugins initialized successfully.");
    } catch (err) {
        console.error("Infrastructure script injection failed:", err);
    }
};