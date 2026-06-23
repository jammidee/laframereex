/**
 * Copyright (C) 2012-2026 Lalulla OPC. All rights reserved.
 * Copyright (c) 2017 - Joel M. Damaso - mailto:jammi_dee@yahoo.com Manila/Philippines
 * This file is part of Lalulla OPC System.
 *
 * Lalulla Framework is distributed under the terms of the GNU General Public License 
 * as published by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Lalulla System is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Cloud Gate System.  If not, see <http://www.gnu.org/licenses/>.
 *
 * Framework Designed by: Jammi Dee (jammi_dee@yahoo.com)
 * Updated for React API Architecture - 06/23/2026
 *
*/

// ==========================================
// 1. MODULE DEPENDENCIES & CORE IMPORTS
// ==========================================
const express       = require('express');
const cors          = require('cors');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const logger        = require('morgan');
const session       = require('express-session');
require('dotenv').config();

// ==========================================
// 2. CONFIGURATIONS & DATABASE INITIALIZATION
// ==========================================
const sequelize     = require('./config/db');
const appConfig     = require('./config/app.config');

const app           = express();
const PORT          = process.env.PORT || 5000;

// ==========================================
// 3. LICENSING & TIME-BOUND DEMO GUARDS
// ==========================================
// Expiration date of the demo app
const xdate = new Date("2030-02-12");
const cdate = new Date();

if (cdate > xdate) {
    console.log('============================================================================');
    console.log('Time-bound access to the app has been reached!');
    console.log('The limit is ' + xdate);
    console.log('============================================================================');
    process.exit(1);
}

// ==========================================
// 4. GLOBAL HTTP MIDDLEWARES
// ==========================================
// Enable Cross-Origin Resource Sharing (CORS) for React frontend client calls
app.use(cors());

// HTTP Request logging
app.use(logger('dev'));

// Body parsers for processing payload formats (JSON and URL-Encoded)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cookie Parser Middleware
app.use(cookieParser());

// ==========================================
// 5. SESSION ENGINE STORAGE DEFINITIONS
// ==========================================
app.use(session({
    name: 'session',
    secret: 'Lux in Domino',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 30 * 60 * 1000 // 30 minutes longevity
    }
}));

// ==========================================
// 6. GLOBAL SESSION APPLICATION HYDRATOR
// ==========================================
app.use((req, res, next) => {
    if (!req.session.app) {
        req.session.app = {
            name:       appConfig.appname,
            copyright:  appConfig.appcopyright,
            prefix:     appConfig.appprefix,
            id:         appConfig.appid,
            category:   'B2C',
            context:    'laMobile2018',
            logged:     'NO'
        };
    }
    next();
});

// ==========================================
// 7. ENVIRONMENT VARIABLES & FEATURE SWITCHES
// ==========================================
app.use(function(req, res, next) {
    req.session.cgAppId          = process.env.APP_ID           || 'LAM';
    req.session.cgAppName        = process.env.APP_NAME         || 'LAMOBILE';
    req.session.cgAppVersion     = process.env.APP_VERSION      || '0.0.0';
    req.session.cgAppDesc        = process.env.APP_DESC         || 'This an official template of Lalulla Framework using NodeJS';
    req.session.cgAppPrefix      = process.env.APP_PREFIX       || 'LAT';
    req.session.cgAppProtect     = process.env.APP_PROTECT      || 'ON';
    req.session.cgFrameCodeName  = process.env.APP_FRAMECODENAME || 'Begonia';
    req.session.cgFrameVersion   = process.env.APP_FRAMEVERSION || '0.0.0';
    req.session.cgFrameworkVersion = process.env.APP_FRAMEVERSION || '0.0.0'; 
    req.session.signupEntity     = process.env.APP_SIGNUPENTITY || 'LALULLA';
    req.session.entityid         = process.env.APP_SIGNUPENTITY || 'LALULLA';
    req.session.cgSessId         = '';
    req.session.cgMotd           = '';
    req.session.cgBodyClass      = '';
    req.session.cgSiteMode       = 'YES';
    req.session.appprotect       = process.env.APP_PROTECT      || 'OFF';
    req.session.enforcecaptcha   = process.env.APP_ENFORCECAPTCHA || 'OFF';
    req.session.enforcehttps     = process.env.APP_ENFORCEHTTPS || 'OFF';
    req.session.enforceotp       = process.env.APP_ENFORCEOTP   || 'OFF';

    // Framework dynamic components setup Switches
    req.session.cgSwApp          = process.env.APP_SWITCH_APP   || 'ON';
    req.session.cgSwMsg          = process.env.APP_SWITCH_MSG   || 'ON';
    req.session.cgSwNoti         = process.env.APP_SWITCH_NOTI  || 'ON';
    req.session.cgSwTask         = process.env.APP_SWITCH_TASK  || 'ON';
    req.session.cgSwRight        = process.env.APP_SWITCH_RIGHT || 'ON';
    req.session.cgSwNoDev        = process.env.APP_SWITCH_NODEV || 'ON';
    req.session.cgSwLog          = process.env.APP_SWITCH_LOG   || 'ON';
    req.session.logged           = 'NO';

    next();
});

// ==========================================
// 8. SECURITY CONTROLLER & USER RECONCILIATION
// ==========================================
const { can } = require('./helpers/access.helper');

app.use((req, res, next) => {
    if (req.session?.logged_in) {
        req.user = {
            id:     req.session.user_id,
            name:   req.session.user_name,
            email:  req.session.user_email,
            role:   req.session.user_role,
            entity: req.session.user_entity,
            appid:  req.session.user_appid
        };
    }
    next();
});

// ==========================================
// 9. API SYSTEM ROUTES INTERFACES
// ==========================================

// Core Server Health Check Endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'UP', message: 'Express backend is running smoothly.' });
});

// Primary Business Action Handlers
// app.use('/',                             require('./src/modules/site/site.routes'));
// app.use('/api/v1/hello',                 require('./src/routes/api/v1/hello/hello.routes'));
// app.use('/auth',                         require('./src/routes/systems/auth.routes'));
// app.use('/access-denied',                require('./src/routes/systems/access_denied.routes'));
// app.use('/api/v1/systems/auth',          require('./src/routes/api/v1/systems/auth.routes'));
// app.use('/api/v1/systems/config',        require('./src/routes/api/v1/systems/config.routes'));
// app.use('/site',                         require('./src/modules/site/site.routes'));
// app.use('/users',                        require('./src/modules/user/user.routes'));
// app.use('/welcome',                      require('./src/modules/welcome/welcome.routes'));
// app.use('/system/hello',                 require('./src/routes/systems/hello.routes'));
// app.use('/system/entity',                require('./src/routes/systems/entity.routes'));
// app.use('/dashboard',                    require('./src/routes/capp/dashboard/dashboard.routes'));
// app.use('/module/template',              require('./src/modules/tmpl/tmpl.routes'));

// API Standard Response Formatter Middleware helper integration
// const respHelper = require('./src/middlewares/resphandler.middleware');
// app.use(respHelper);

// ==========================================
// 10. MIDDLEWARE ERROR MANAGEMENT & ROUTING REGISTRY
// ==========================================

// Dynamic Module Autoloader Execution Runtime
// const registerModules = require('./routes/loader.routes');
// registerModules(app);

// API 404 Fallback Catch Layer
app.use((req, res, next) => {
    const err = new Error('API Endpoint Not Found');
    err.status = 404;
    next(err);
});

// Generic JSON Error Output Object payload wrapper
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        error: {
            status: statusCode,
            message: err.message || 'Internal Server Error',
            // Trace stack details exposed explicitly inside a localized dev scope context
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
        }
    });
});

// ==========================================
// 11. RECOVERY PROTOCOLS & ENGINE INITIALIZATION SEQUENCE
// ==========================================
// const cronLoader = require('./src/helpers/cron_loader.helper');

// const bootstrapSystem = async () => {
//     try {
//         console.info('[System] Verifying database cluster connection state...');
        
//         // Ensure Sequelize active cluster communication loops are functional before accepting traffic
//         await sequelize.authenticate();
//         console.info('[System] Database cluster handshakes verified.');

//         // Initialize Native Service Worker Schedules Registry
//         console.info('[System] Loading pure background service execution registry...');
//         cronLoader();

//         // Boot application network execution engine context listener
//         app.listen(PORT, () => {
//             console.log(`[System] Server actively running on node network interface port ${PORT}`);
//         });

//     } catch (err) {
//         console.error('[Fatal System Error] Distributed environment failed to boot:', err.message);
//         process.exit(1);
//     }
// };

// // Ignite Database validations, Workers & Core Listener
// bootstrapSystem();

// ==========================================
// 12. GRACEFUL APPARATUS TEARDOWN LIFECYCLES
// ==========================================
const handleTeardown = async (signal) => {
    console.log(`\n[System] Received ${signal}. Draining database connection pools gracefully...`);
    
    try {
        // Safe connection pool termination
        await sequelize.close();
        console.log('[System] Sequelize connection pool terminated cleanly. Process exiting.');
        process.exit(0);
    } catch (err) {
        console.error('[System Error] Error during database connection pool teardown:', err.message);
        process.exit(1);
    }
};

// Intercept operating system signal traps cleanly 
process.on('SIGINT', () => handleTeardown('SIGINT'));
process.on('SIGTERM', () => handleTeardown('SIGTERM'));

module.exports = app;