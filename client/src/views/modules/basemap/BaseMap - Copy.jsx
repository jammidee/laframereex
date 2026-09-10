/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso)
 * This file is part of the Lalulla System.
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR        : Jammi Dee (Joel M. Damaso)
 * LOCATION      : Manila, Philippines
 * EMAIL         : jammi_dee@yahoo.com
 * CREATED DATE  : August 25, 2026 02:58 AM
 * ------------------------------------------------------------------------
 * DESCRIPTION   : Base Map view module using raw Leaflet instance to handle
 *                 monorepo hook isolation safely.
 * ------------------------------------------------------------------------
 */

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import LaNavigation from './layout/laNavigation';
import LaSideBar    from './layout/laSideBar';
import LaFooter     from './layout/laFooter';

/**
 * STUB COMPONENTS
 */
function LaRightBar() {
    return (
        <aside className="control-sidebar control-sidebar-dark">
            <div className="p-3">
                <h5>Control Sidebar</h5>
                <p>Sidebar content</p>
            </div>
        </aside>
    );
}

/**
 * DEFAULT MAP CONFIGURATION
 */
const DEFAULT_CENTER = [14.59951, 120.98422];
const DEFAULT_ZOOM = 13;

/**
 * BASE MAP COMPONENT
 */
function BaseMap({ user, onLogout }) {
    const mapContainerRef = useRef(null);
    const mapInstanceRef  = useRef(null);

    useEffect(() => {
        // Fix standard Leaflet asset pathing
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
            iconUrl:       'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
            shadowUrl:     'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
        });

        if (!mapInstanceRef.current && mapContainerRef.current) {
            const map = L.map(mapContainerRef.current, {
                center: DEFAULT_CENTER,
                zoom: DEFAULT_ZOOM,
                zoomControl: false,
            });

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            L.control.zoom({ position: 'bottomright' }).addTo(map);

            const markers = [
                { position: [14.59951, 120.98422], title: 'Manila Central Office' },
                { position: [14.5869, 121.0614],   title: 'Ortigas Hub' }
            ];

            markers.forEach((item) => {
                L.marker(item.position)
                    .addTo(map)
                    .bindPopup(`<strong>${item.title}</strong><br/>Lat: ${item.position[0]}, Lng: ${item.position[1]}`);
            });

            mapInstanceRef.current = map;
        }

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    return (

        <div className="wrapper">

            {/* Navigation Top Bar */}
            <LaNavigation user={user} onLogout={onLogout} />

            {/* Left Main Sidebar Menu */}
            {/* <LaSideBar /> */}
            <LaSideBar user={user} activePage="basemap" onLogout={onLogout} />

            {/* Right Secondary Control Sidebar */}
            {/* <LaRightBar /> */}

            {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
                {/* Content Header (Page header) */}
                <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h6 className="m-0">Base Map</h6>
                            </div>
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right d-flex justify-content-sm-end list-inline">
                                    <li className="breadcrumb-item list-inline-item">
                                        <a href="#">Home</a>
                                    </li>
                                    <li className="breadcrumb-item active list-inline-item">Base Map</li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content Viewport */}
                <div className="content">
                    <div className="container-fluid">

                        <div className="row">
                            <div className="col-12">
                                <div className="card">
                                    <div className="card-body p-0">
                                        <div 
                                            ref={mapContainerRef} 
                                            style={{ height: 'calc(100vh - 240px)', minHeight: '450px', width: '100%' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
                {/* /.content */}
            </div>
            {/* /.content-wrapper */}

            {/* Dynamic layout mounting */}
            <LaFooter />

        </div>

    );
}

export default BaseMap;