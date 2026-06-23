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
 * CREATED DATE : April 04, 2026 08:01 AM
 * ------------------------------------------------------------------------
 * npx sequelize-cli db:seed --seed 20260404000021-seed-configdb.js
 */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    // ----------------------------------------------------------------------
    // Default configuration seed data
    // ----------------------------------------------------------------------
    await queryInterface.bulkInsert('configdb', [
      // ----------------- App Info -----------------
      {
        entityid: 'LALULLA',
        appid: 'CGONE',
        var_key: 'APP_NAME',
        var_value: 'Lalulla System',
        var_type: 'string',
        description: 'Application display name',
        status: 'active',
        sstatus: 'ACTIVE',
        deleted: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        entityid: 'LALULLA',
        appid: 'CGONE',
        var_key: 'APP_DESC',
        var_value: 'Lalulla Application Template',
        var_type: 'string',
        description: 'Application description',
        status: 'active',
        sstatus: 'ACTIVE',
        deleted: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        entityid: 'LALULLA',
        appid: 'CGONE',
        var_key: 'APP_PREFIX',
        var_value: 'FEA',
        var_type: 'string',
        description: 'Application prefix',
        status: 'active',
        sstatus: 'ACTIVE',
        deleted: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        entityid: 'LALULLA',
        appid: 'CGONE',
        var_key: 'APP_VERSION',
        var_value: '1.07.1972',
        var_type: 'string',
        description: 'Application version',
        status: 'active',
        sstatus: 'ACTIVE',
        deleted: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        entityid: 'LALULLA',
        appid: 'CGONE',
        var_key: 'APP_COPYRIGHT',
        var_value: 'Lalulla OPC',
        var_type: 'string',
        description: 'Application copyright',
        status: 'active',
        sstatus: 'ACTIVE',
        deleted: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // ----------------- Core System Info -----------------
      {
        entityid: 'LALULLA',
        appid: 'CGONE',
        var_key: 'CG_VERSION',
        var_value: '1.19.72',
        var_type: 'string',
        description: 'Core framework version',
        status: 'active',
        sstatus: 'ACTIVE',
        deleted: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        entityid: 'LALULLA',
        appid: 'CGONE',
        var_key: 'ALLOW_LOGIN',
        var_value: 'true',
        var_type: 'bool',
        description: 'Allow users to log in',
        status: 'active',
        sstatus: 'ACTIVE',
        deleted: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        entityid: 'LALULLA',
        appid: 'CGONE',
        var_key: 'AUTO_REG',
        var_value: 'false',
        var_type: 'bool',
        description: 'Allow auto registration of new users',
        status: 'active',
        sstatus: 'ACTIVE',
        deleted: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        entityid: 'LALULLA',
        appid: 'CGONE',
        var_key: 'CG_LANDINGPAGE',
        var_value: 'true',
        var_type: 'bool',
        description: 'Enable CG landing page',
        status: 'active',
        sstatus: 'ACTIVE',
        deleted: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },

      // ----------------- Admin/Config Contact Info -----------------
      {
        entityid: 'LALULLA',
        appid: 'CGONE',
        var_key: 'CFG_NAME',
        var_value: 'Jammi Dee',
        var_type: 'string',
        description: 'System administrator name',
        status: 'active',
        sstatus: 'ACTIVE',
        deleted: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        entityid: 'LALULLA',
        appid: 'CGONE',
        var_key: 'CFG_PHONE',
        var_value: '0917-580-9483',
        var_type: 'string',
        description: 'System administrator phone',
        status: 'active',
        sstatus: 'ACTIVE',
        deleted: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        entityid: 'LALULLA',
        appid: 'CGONE',
        var_key: 'CFG_EMAIL',
        var_value: 'jammi_dee@yahoo.com',
        var_type: 'string',
        description: 'System administrator email',
        status: 'active',
        sstatus: 'ACTIVE',
        deleted: 0,
        created_at: new Date(),
        updated_at: new Date(),
      }

    ], {});
  },

  async down(queryInterface, Sequelize) {

    // Remove seeded config entries safely
    await queryInterface.bulkDelete('configdb', {
      var_key: {
        [Sequelize.Op.in]: [
          'APP_NAME', 'APP_DESC', 'APP_PREFIX', 'APP_VERSION', 'APP_COPYRIGHT',
          'CG_VERSION', 'ALLOW_LOGIN', 'AUTO_REG', 'CG_LANDINGPAGE',
          'CFG_NAME', 'CFG_PHONE', 'CFG_EMAIL'
        ]
      }
    });
  }
};