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
 * CREATED DATE : June 23, 2026 11:00 PM
 * ------------------------------------------------------------------------
 */

const { exec }  = require('child_process');
const fs        = require('fs-extra');
const path      = require('path');

//const sourceDir = 'src/views';  // Source directory
//const outputDir = 'dist/views'; // Output directory

// Read the current version from package.json
const packageJsonPath       = path.join(__dirname, 'package.json');
const packageJson           = require(packageJsonPath);
let [major, minor, patch]   = packageJson.version.split('.').map(Number);

// Logic to increment version parts
if (patch < 1000) {
    patch += 1;
} else if (minor < 100) {
    minor += 1;
    patch = 0;
} else {
    major += 1;
    minor = 0;
    patch = 0;
}

// Update the version in package.json
packageJson.version = `${major}.${minor}.${patch}`;
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

// Increment the version (e.g., by appending a build number)
const buildNumber = new Date().getTime();
const version = `${major}.${minor}.${patch}.${buildNumber}`;

console.log(`Increment framework version to ${version}.`);
