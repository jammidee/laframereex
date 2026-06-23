/**
 * ------------------------------------------------------------------------
 * Copyright (C) 2026 Lalulla OPC. All rights reserved.
 *
 * Copyright (c) 2017 - Jammi Dee (Joel M. Damaso)
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
 * CREATED DATE : April 04, 2026 07:03 AM
 * ------------------------------------------------------------------------
 * npx sequelize-cli db:migrate --seed 20260404000021-seed-configdb.js
 */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {

    // ---------------------------------------------------------------------
    // Optimized ConfigDB Migration (April 04, 2026)
    // Indexes minimized for performance and scalability
    // ---------------------------------------------------------------------

    await queryInterface.createTable('configdb', {

      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      entityid: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: '_NA_'
      },

      appid: {
        type: Sequelize.STRING(50),
        allowNull: true
      },

      userid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },

      var_key: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true // UNIQUE automatically creates index
      },

      var_value: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      var_type: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: 'string'
      },

      description: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      status: {
        type: Sequelize.ENUM('active', 'inactive', 'archived'),
        allowNull: true,
        defaultValue: 'active'
      },

      // -------------------------
      // System Metadata
      // -------------------------

      vversion: {
        type: Sequelize.STRING(20),
        allowNull: true
      },

      pid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },

      sstatus: {
        type: Sequelize.STRING(36),
        allowNull: true,
        defaultValue: 'ACTIVE'
      },

      deleted: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },

      created_by: {
        type: Sequelize.INTEGER,
        allowNull: true
      },

      updated_by: {
        type: Sequelize.INTEGER,
        allowNull: true
      },

      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }

    });

    // ---------------------------------------------------------------------
    // OPTIONAL: Composite index for multi-tenant optimization
    // (Recommended if using entity-based configuration separation)
    // ---------------------------------------------------------------------
    
    // In case you need, uncomment below
    // await queryInterface.addIndex('configdb', ['var_key']);
    // await queryInterface.addIndex('configdb', ['status']);
    // await queryInterface.addIndex('configdb', ['entityid']);
    // await queryInterface.addIndex('configdb', ['appid']);
    // await queryInterface.addIndex('configdb', ['deleted']);
    // await queryInterface.addIndex('configdb', ['sstatus']);

    await queryInterface.addIndex('configdb', ['entityid', 'var_key']);

  },

  async down(queryInterface, Sequelize) {

    // ---------------------------------------------------------------------
    // Rollback - Drop table and ENUM cleanup
    // ---------------------------------------------------------------------

    await queryInterface.dropTable('configdb');

    // Important cleanup for MySQL ENUM
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_configdb_status";'
    );

  }

};