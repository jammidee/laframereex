/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : July 02, 2026 04:35 PM
 * ------------------------------------------------------------------------
 */

const { canAccessMenu } = require('../../../../helpers/access.helper');
const config = require('../../../../config/app.config');

class RbacController {

    /**
     * Compile and return permissions dictionary for the active user session/token
     */
    getUserPermissions = async (req, res) => {
        try {
            // Pull the role assigned during JWT verification/normalization
            const userRole = req.user?.role || req.session?.user_role || 'Visitor';
            const menuAccess = config['menu-access'] || {};
            const compiledPermissions = {};

            // Evaluate every single key locally on the CPU in a fast iteration loop
            for (const menuId in menuAccess) {
                if (Object.prototype.hasOwnProperty.call(menuAccess, menuId)) {
                    compiledPermissions[menuId] = canAccessMenu(menuId, userRole);
                }
            }

            return res.status(200).json({
                success: true,
                role: userRole,
                permissions: compiledPermissions
            });
        } catch (err) {
            console.error(`RBAC Controller Error: ${err.message}`);
            return res.status(500).json({
                success: false,
                message: 'Failed to compile access control matrices.'
            });
        }
    }
}

// Explicitly export the class definition so it can be instantiated with "new" in routes
module.exports = RbacController;