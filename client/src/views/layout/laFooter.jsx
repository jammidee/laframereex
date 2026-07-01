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
 * CREATED DATE : July 01, 2026 12:56 AM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Core Layout Footer Component translating native AdminLTE 
 * Pug structures into reusable React functional architecture.
 * ------------------------------------------------------------------------
 */

import React from 'react';

export default function LaFooter() {
    return (
        <footer className="main-footer">
            <strong>
                Copyright &copy; 2014-2021 &nbsp;
                <a href="http://lalulla.com" target="_blank" rel="noopener noreferrer">Lalulla OPC.</a>
            </strong>
            &nbsp; All rights reserved.
            <div className="float-right d-none d-sm-inline-block">
                {/* Notice the CONFIG?. syntax here */}
                <b>Entity:</b>&nbsp; {CONFIG?.VITE_ENTITYID || 'N/A'} &nbsp;
                <b>App ID:</b>&nbsp; {CONFIG?.VITE_APPID || 'N/A'} &nbsp;
                <b>Version</b>&nbsp; {CONFIG?.VITE_APPVERSION || '0.0.0'}
            </div>
        </footer>
    );
}