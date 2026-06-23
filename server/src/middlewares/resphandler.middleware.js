/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2025 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR        : Jammi Dee (Joel M. Damaso)
 * LOCATION      : Manila, Philippines
 * EMAIL         : jammi_dee@yahoo.com
 * CREATED DATE  : April 09, 2026 08:12 PM
 * ------------------------------------------------------------------------
 */

// Controller usage example:
// exports.getSystems = async (req, res) => {
//     try {
//         const systems = await SystemService.findAll();

//         // Usage of our new helper
//         return res.apiSuccess(systems, "Systems retrieved successfully");
//     } catch (error) {
//         // Uniform error handling
//         return res.apiError("Failed to fetch systems", 500, error.message);
//     }
// };

const respHelper = require('../utils/resphelper');

module.exports = (req, res, next) => {
    res.apiSuccess = (data, message, statusCode) => {
        respHelper.success(res, data, message, statusCode);
    };

    res.apiError = (message, statusCode, errors) => {
        respHelper.error(res, message, statusCode, errors);
    };

    //Pro Tip
    // res.apiError = (message, statusCode, errors) => {
    //     // If it's an AJAX/API request, send JSON
    //     if (req.xhr || req.path.startsWith('/api')) {
    //         return respHelper.error(res, message, statusCode, errors);
    //     }
    //     // If it's a browser request, redirect to an error page or back with a message
    //     return res.status(statusCode).render('errors/error_page', { message, statusCode });
    // };

    next();
};