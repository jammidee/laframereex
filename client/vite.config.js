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
 * CREATED DATE : June 26, 2026 01:13 AM
 * ------------------------------------------------------------------------
 */

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import ini from 'ini'
import TOML from '@iarna/toml'

export default defineConfig(() => {
    const iniPath = path.resolve(__dirname, 'config.ini');
    const tomlPath = path.resolve(__dirname, 'config.toml');
    const defineEnv = {};
    const configObject = {}; // <-- 1. Create a clean key-value dictionary object
    let parsedData = null;

    // Detect and parse the configuration file (INI takes priority, fallback to TOML)
    if (fs.existsSync(iniPath)) {
        const fileContent = fs.readFileSync(iniPath, 'utf-8');
        parsedData = ini.parse(fileContent);
    } else if (fs.existsSync(tomlPath)) {
        const fileContent = fs.readFileSync(tomlPath, 'utf-8');
        parsedData = TOML.parse(fileContent);
    }

    // Extract and process environment keys prefixed with VITE_
    if (parsedData) {
        Object.keys(parsedData).forEach((section) => {
            if (typeof parsedData[section] === 'object') {
                // Loop inside the section (e.g., [api] or [app])
                Object.keys(parsedData[section]).forEach((key) => {
                    if (key.startsWith('VITE_')) {
                        defineEnv[`import.meta.env.${key}`] = JSON.stringify(parsedData[section][key]);
                        configObject[key] = parsedData[section][key]; // <-- Save to dict
                    }
                });
            } else if (section.startsWith('VITE_')) {
                // Handle global unsectioned root keys
                defineEnv[`import.meta.env.${section}`] = JSON.stringify(parsedData[section]);
                configObject[section] = parsedData[section]; // <-- Save to dict
            }
        });
    }

    // 2. Inject the whole dictionary as a safe browser window namespace variable
    defineEnv['window.CONFIG'] = JSON.stringify(configObject);

    return {
        plugins: [react()],
        define: defineEnv, // Inject custom config variables globally
        build: {
            rollupOptions: {
                input: {
                    index: path.resolve(__dirname, 'index.html'), // This is the main application
                    site: path.resolve(__dirname, 'site.html'),   // This is the site page only
                },
            },
        },
        resolve: {
            alias: {
                '@assets':      path.resolve(__dirname, './src/assets'),
                '@components':  path.resolve(__dirname, './src/components'),
                '@hooks':       path.resolve(__dirname, './src/hooks'),
                '@services':    path.resolve(__dirname, './src/services'),
                '@views':       path.resolve(__dirname, './src/views'),
            },
        },
    };
});