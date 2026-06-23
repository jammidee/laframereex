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
 * CREATED DATE : March 15, 2026 12:52 AM
 * ------------------------------------------------------------------------
 */

// utils/logAction.js

const db = require('../config/db'); // your mysql connection

// const logAction = async (
//   req,
//   actionType,
//   actionDetails,
//   severity = 'INFO',
//   isSuspicious = false
// ) => {
//   try {

//     const userId   = req.session?.user_id ?? 0;
//     const entityId = req.session?.user_entity ?? '_NA_';

//     const logData = {
//       entityid: entityId,
//       user_id: userId,
//       action_type: actionType,
//       action_details: actionDetails,
//       // Use optional chaining and provide a fallback string
//       ip_address: req?.ip || '0.0.0.0',
//       user_agent: req?.headers ? req.headers['user-agent'] : 'Unknown Agent',
//       severity: severity,
//       is_suspicious: isSuspicious ? 1 : 0,
//       sstatus: 'ACTIVE',
//       pid: 0,
//       userid: userId,
//       deleted: 0
//     };

//     await db.query('INSERT INTO system_logs SET ?', logData);

//   } catch (err) {
//     console.error('Error logging action:', err);
//   }
// };

const logAction = async (
  req,
  actionType,
  actionDetails,
  severity = 'INFO',
  isSuspicious = false
) => {
  try {

    // Use optional chaining to safely access session and headers
    const userId   = req?.session?.user_id ?? 0;
    const entityId = req?.session?.user_entity ?? '_NA_';

    // Safeguard headers and IP
    const userAgent = req?.headers ? req.headers['user-agent'] : 'Unknown Agent';
    const ipAddress = req?.ip ?? '0.0.0.0';

    const logData = {
      entityid: entityId,
      user_id: userId,
      action_type: actionType,
      action_details: actionDetails,
      ip_address: ipAddress,
      user_agent: userAgent,
      severity: severity,
      is_suspicious: isSuspicious ? 1 : 0,
      sstatus: 'ACTIVE',
      pid: 0,
      userid: userId,
      deleted: 0
    };

    await db.query(
      'INSERT INTO system_logs (entityid, user_id, action_type, action_details, ip_address, user_agent, severity, is_suspicious, sstatus, pid, userid, deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      {
        replacements: [
          logData.entityid, logData.user_id, logData.action_type,
          logData.action_details, logData.ip_address, logData.user_agent,
          logData.severity, logData.is_suspicious, logData.sstatus,
          logData.pid, logData.userid, logData.deleted
        ]
      }
    );

  } catch (err) {

    // We log the error but don't 'throw' it,
    // so the user's redirect still happens.
    console.error('CRITICAL: logAction failed:', err.message);

  }
};

module.exports = logAction;