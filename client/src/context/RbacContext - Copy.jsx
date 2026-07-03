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
 * CREATED DATE : July 02, 2026 04:35 PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Context provider that keeps compiled role configurations 
 * in memory to prevent redundant API evaluations.
 * ------------------------------------------------------------------------
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const RbacContext = createContext(null);

export function RbacProvider({ children, isAuthenticated }) {
    const [permissions, setPermissions] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Only trigger API when user is successfully flagged as authenticated
        if (!isAuthenticated) {
            setPermissions({});
            setLoading(false);
            return;
        }

        setLoading(true);
        // Request the compiled matrix lookup dictionary
        fetch('/api/v1/systems/rbac/permissions', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Adapt to your structural token delivery setup
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                setPermissions(data.permissions);
            }
        })
        .catch(err => console.error('Error compiling system access rules:', err))
        .finally(() => setLoading(false));
    }, [isAuthenticated]);

    // Fast memory dictionary reading logic definitions
    const can = (permissionId) => {
        return !!permissions[permissionId];
    };

    const cannot = (permissionId) => {
        return !can(permissionId);
    };

    return (
        <RbacContext.Provider value={{ can, cannot, loading }}>
            {children}
        </RbacContext.Provider>
    );
}

// Custom hook helper access point
export function useRbac() {
    return useContext(RbacContext);
}