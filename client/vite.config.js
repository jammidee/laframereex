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
import path from 'path' // 1. Import path

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
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
            // 2. Define your shortcuts here
            '@assets':      path.resolve(__dirname, './src/assets'),
            '@components':  path.resolve(__dirname, './src/components'),
            '@hooks':       path.resolve(__dirname, './src/hooks'),
            '@services':    path.resolve(__dirname, './src/services'),
            '@views':       path.resolve(__dirname, './src/views'),
        },
    },
})