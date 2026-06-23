/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso) <jammi_dee@yahoo.com>
 * This file is part of the Lalulla System.
 *
 * Lalulla System is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU General Public License for more details.
 *
 * ------------------------------------------------------------------------
 * PRODUCT NAME : Lalulla Nodejs Framework
 * AUTHOR       : Jammi Dee (Joel M. Damaso)
 * LOCATION     : Manila, Philippines
 * EMAIL        : jammi_dee@yahoo.com
 * CREATED DATE : March 28, 2026 05:57 PM
 * ------------------------------------------------------------------------
 */

'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const passwordHash      = await bcrypt.hash('P@55w0rd!Admin', 10);
    const userPasswordHash  = await bcrypt.hash('P@55w0rd!User', 10);

    await queryInterface.bulkInsert('users', [
      {
        juid: crypto.randomUUID(),
        username: 'superadmin',
        password: passwordHash,
        email: 'superadmin@lalulla.com',
        firstname: 'Super',
        lastname: 'Admin',
        phone: '09170000001',
        gender: 1,
        store_id: null,
        status: 'ACTIVE',
        entityid: 'GCONE',
        last_login_at: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        juid: crypto.randomUUID(),
        username: 'admin',
        password: userPasswordHash,
        email: 'admin@lalulla.com',
        firstname: 'Admin',
        lastname: 'User',
        phone: '09170000003',
        gender: 1,
        store_id: null,
        status: 'ACTIVE',
        entityid: 'GCONE',
        last_login_at: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        juid: crypto.randomUUID(),
        username: 'manager',
        password: userPasswordHash,
        email: 'manager@lalulla.com',
        firstname: 'Manager',
        lastname: 'User',
        phone: '09170000004',
        gender: 1,
        store_id: null,
        status: 'ACTIVE',
        entityid: 'GCONE',
        last_login_at: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        juid: crypto.randomUUID(),
        username: 'approver',
        password: userPasswordHash,
        email: 'approver@lalulla.com',
        firstname: 'Approver',
        lastname: 'User',
        phone: '09170000005',
        gender: 1,
        store_id: null,
        status: 'ACTIVE',
        entityid: 'GCONE',
        last_login_at: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        juid: crypto.randomUUID(),
        username: 'reviewer',
        password: userPasswordHash,
        email: 'reviewer@lalulla.com',
        firstname: 'Reviewer',
        lastname: 'User',
        phone: '09170000006',
        gender: 1,
        store_id: null,
        status: 'ACTIVE',
        entityid: 'GCONE',
        last_login_at: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        juid: crypto.randomUUID(),
        username: 'support',
        password: userPasswordHash,
        email: 'support@lalulla.com',
        firstname: 'Support',
        lastname: 'User',
        phone: '09170000007',
        gender: 1,
        store_id: null,
        status: 'ACTIVE',
        entityid: 'GCONE',
        last_login_at: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      },
      {
        juid: crypto.randomUUID(),
        username: 'testuser',
        password: userPasswordHash,
        email: 'testuser@lalulla.com',
        firstname: 'Testuser',
        lastname: 'User',
        phone: '09170000008',
        gender: 1,
        store_id: null,
        status: 'ACTIVE',
        entityid: 'GCONE',
        last_login_at: null,
        created_at: new Date(),
        updated_at: new Date(),
        deleted_at: null
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', {
      username: ['superadmin', 'admin', 'manager', 'approver', 'reviewer','support', 'testuser']
    }, {});
  }
};