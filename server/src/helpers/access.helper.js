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
 * CREATED DATE : March 15, 2026 03:34 PM
 * ------------------------------------------------------------------------
 */

/**
 * ------------------------------------------------------------------------
 * Lalulla Access Helper
 * ------------------------------------------------------------------------
 * Detects if a user role has access to a specific menu permission
 * ------------------------------------------------------------------------
 */

const config = require('../config/app.config')   // merged config
// or directly: require('../config/app.access')

/**
 * ------------------------------------------------------------------------
 * Check if role can access a specific menu
 * ------------------------------------------------------------------------
 * This function evaluates whether a given user role is allowed
 * to access a specific menu permission based on:
 * 
 * 1. menu-access   -> maps menuId to allowed groups
 * 2. cg-roles      -> maps group to actual user roles
 *
 * Flow:
 * menuId → group(s) → role(s) → match userRole
 *
 * @param {String} menuId   - Permission key (ex: 'user_create')
 * @param {String} userRole - Actual user role (ex: 'Admin')
 * @returns {Boolean}       - true if allowed, false otherwise
 * ------------------------------------------------------------------------
 */
function canAccessMenu(menuId, userRole) {

  // Get configuration references
  const menuAccess = config['menu-access']   // permission → groups
  const roleGroups = config['cg-roles']      // group → roles

  // -------------------------------------------------------------
  // Validate menuId
  // If invalid or not defined in config, deny access immediately
  // -------------------------------------------------------------
  if (typeof menuId !== 'string' || !menuAccess?.[menuId]) {
    return false
  }

  // -------------------------------------------------------------
  // Ensure groups is always treated as an array
  // Even if config accidentally stores a single string
  // -------------------------------------------------------------
  const groups = Array.isArray(menuAccess[menuId])
    ? menuAccess[menuId]
    : [menuAccess[menuId]]

  // -------------------------------------------------------------
  // Loop through allowed groups for this menu
  // Check if the userRole exists inside that group
  // -------------------------------------------------------------
  for (const group of groups) {

    // If group exists and contains the userRole → grant access
    if (
      roleGroups?.[group] &&
      roleGroups[group].includes(userRole)
    ) {
      return true
    }
  }

  // -------------------------------------------------------------
  // If no match found → deny access
  // -------------------------------------------------------------
  return false
}

/**
 * ------------------------------------------------------------------------
 * Shortcut Helper
 * ------------------------------------------------------------------------
 * Cleaner wrapper that accepts full user object instead of raw role.
 *
 * Usage:
 *   can('user_create', req.user)
 *
 * @param {String} menuId
 * @param {Object} user
 * @returns {Boolean}
 * ------------------------------------------------------------------------
 */
function can(menuId, user) {

  // console.log(menuId);
  // console.log(user);
  // console.log(user?.role);
  // console.log(canAccessMenu(menuId, user?.role));
  return canAccessMenu(menuId, user?.role);

}

/**
 * ------------------------------------------------------------------------
 * Inverse Shortcut Helper
 * ------------------------------------------------------------------------
 * Returns true if user DOES NOT have access.
 *
 * Usage:
 *   if (cannot('user_delete', req.user)) { ... }
 *
 * @param {String} menuId
 * @param {Object} user
 * @returns {Boolean}
 * ------------------------------------------------------------------------
 */
function cannot(menuId, user) {
  return !can(menuId, user)
}

/**
 * Middleware wrapper
 */
// function authorize(menuId) {
//   return (req, res, next) => {

//     const userRole = req.user?.role;

//     if (!canAccessMenu(menuId, userRole)) {
//       return res.status(403).json({
//         success: false,
//         message: 'Access Denied'
//       })
//     }

//     next()
//   }
// }

function authorize(menuId) {
  return (req, res, next) => {

    const userRole = req.user?.role || req.session?.user_role

    if (!canAccessMenu(menuId, userRole)) {

      // Option 1: Simple redirect
      return res.redirect('/access-denied')

    }

    next()
  }
}

module.exports = {
  canAccessMenu,
  can,
  cannot,
  authorize
}