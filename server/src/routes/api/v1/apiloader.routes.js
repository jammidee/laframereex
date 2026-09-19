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
 * CREATED DATE : September 17, 2026 07:35 PM
 * ------------------------------------------------------------------------
 * DESCRIPTION  : Dynamic module autoloader scanning and mounting API 
 *                routes from the modules directory.
 * ------------------------------------------------------------------------
 */

'use strict';

const fs = require('fs');
const path = require('path');

/**
 * Automatically discovers subfolders in the modules directory and mounts their routers.
 * @param {import('express').Application} app - The Express application instance
 */
function registerModuleAPIs(app) {
  const modulesBasePath = path.join(__dirname, 'modules');
  // const modulesBasePath = path.join(__dirname, '');

  // Check if the modules directory exists before scanning
  if (!fs.existsSync(modulesBasePath)) {
    console.warn(`[Module Loader] Modules directory not found: ${modulesBasePath}`);
    return;
  }

  // Read all entries in the modules folder
  const entries = fs.readdirSync(modulesBasePath, { withFileTypes: true });

  entries.forEach(entry => {
    if (entry.isDirectory()) {
      const moduleName = entry.name;
      const modulePath = path.join(modulesBasePath, moduleName);

      // Look for a standard entry point (index.js or [modulename].routes.js)
      const indexPath = path.join(modulePath, 'index.js');
      const routesPath = path.join(modulePath, `${moduleName}.routes.js`);
      
      console.info(`[System] Path is ${routesPath}...`);

      let routerFileToLoad = null;

      if (fs.existsSync(indexPath)) {
        routerFileToLoad = indexPath;
      } else if (fs.existsSync(routesPath)) {
        routerFileToLoad = routesPath;
      }

      if (routerFileToLoad) {
        try {
          const router = require(routerFileToLoad);
          const mountPath = `/api/v1/modules/${moduleName}`;

          app.use(mountPath, router);
          console.log(`[Module Loader] Successfully mounted module route: ${mountPath}`);
        } catch (error) {
          console.error(`[Module Loader] Failed to load module "${moduleName}":`, error.message);
        }
      } else {
        console.warn(`[Module Loader] Skipped directory "${moduleName}": No index.js or router file found.`);
      }
    }
  });
}

module.exports = registerModuleAPIs;