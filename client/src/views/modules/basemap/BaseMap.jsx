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
 * CREATED DATE  : August 25, 2026 02:56 AM
 * ------------------------------------------------------------------------
 * DESCRIPTION   : Map page module built with native Leaflet instance with 
 *                 multi-layer style switcher support.
 * ------------------------------------------------------------------------
 */

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import Leaflet marker icons via Vite
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Import Leaflet layer control icons via Vite
import layersIcon from 'leaflet/dist/images/layers.png';
import layersIcon2x from 'leaflet/dist/images/layers-2x.png';

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
        // 1. Inject CSS rule for Leaflet layer icons bundled by Vite
        const styleId = 'leaflet-layer-control-fix';
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.innerHTML = `
                .leaflet-control-layers-toggle {
                    background-image: url(${layersIcon}) !important;
                }
                @media (-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi) {
                    .leaflet-control-layers-toggle {
                        background-image: url(${layersIcon2x}) !important;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // 2. Fix Leaflet default marker icon paths
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
            iconRetinaUrl: markerIcon2x,
            iconUrl:       markerIcon,
            shadowUrl:     markerShadow,
        });

        // 3. Initialize map instance
        if (!mapInstanceRef.current && mapContainerRef.current) {
            const osmStandard = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                subdomains: ['a', 'b', 'c'],
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            });

            const satelliteEsri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
                maxZoom: 18,
                attribution: 'Tiles &copy; Esri'
            });

            const cartoDark = L.tileLayer('https://basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 19,
                subdomains: 'abcd',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            });

            const cartoLight = L.tileLayer('https://basemaps.cartocdn.com/rastertiles/light_all/{z}/{x}/{y}{r}.png', {
                maxZoom: 19,
                subdomains: 'abcd',
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
            });

            const map = L.map(mapContainerRef.current, {
                center: DEFAULT_CENTER,
                zoom: DEFAULT_ZOOM,
                zoomControl: false,
                layers: [osmStandard]
            });

            const baseMaps = {
                "Standard": osmStandard,
                "Satellite": satelliteEsri,
                "Dark Mode": cartoDark,
                "Light Mode": cartoLight
            };

            L.control.layers(baseMaps, null, { position: 'topright' }).addTo(map);
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
            <LaNavigation user={user} onLogout={onLogout} />
            <LaSideBar user={user} activePage="basemap" onLogout={onLogout} />

            <div className="content-wrapper d-flex flex-column" style={{ minHeight: 'calc(100vh - 57px)' }}>
                <div className="content flex-fill p-0">
                    <div className="container-fluid h-100 p-0">
                        <div className="row no-gutters h-100">
                            <div className="col-12 h-100">
                                <div className="card h-100 m-0 border-0 rounded-0">
                                    <div className="card-body p-0 h-100">
                                        <div 
                                            ref={mapContainerRef} 
                                            style={{ height: 'calc(100vh - 114px)', minHeight: '500px', width: '100%' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <LaFooter />
        </div>
    );
}

export default BaseMap;