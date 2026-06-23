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
 * CREATED DATE : June 02, 2026 01:45 AM
 * ------------------------------------------------------------------------
 * npx sequelize-cli db:migrate --seed 20260601174516-create-bgndjobs.js
 * npx sequelize-cli db:migrate
 */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {

    // ---------------------------------------------------------------------
    // Optimized Background Jobs Ledger Migration (June 02, 2026)
    // Supports high-concurrency 'FOR UPDATE SKIP LOCKED' worker locks
    // ---------------------------------------------------------------------

    await queryInterface.createTable('bgndjobs', {

      id: {
        type: Sequelize.BIGINT.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      queue_name: {
        type: Sequelize.STRING(50),
        allowNull: false
      },

      payload: {
        type: Sequelize.JSON,
        allowNull: false
      },

      status: {
        type: Sequelize.ENUM('pending', 'processing', 'completed', 'failed'),
        allowNull: true,
        defaultValue: 'pending'
      },

      attempts: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },

      error_message: {
        type: Sequelize.TEXT,
        allowNull: true
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
    // Multi-tenant and high-throughput worker state optimization indexes
    // ---------------------------------------------------------------------
    await queryInterface.addIndex('bgndjobs', ['queue_name', 'status'], {
      name: 'idx_queue_status'
    });

    // Optional composite indexing expansion templates matching enterprise architecture
    // await queryInterface.addIndex('bgndjobs', ['status', 'created_at']);
    // await queryInterface.addIndex('bgndjobs', ['deleted']);

  },

  async down(queryInterface, Sequelize) {

    // ---------------------------------------------------------------------
    // Rollback - Drop table and ENUM cleanup
    // ---------------------------------------------------------------------

    await queryInterface.dropTable('bgndjobs');

    // Important cleanup for MySQL ENUM variants
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_bgndjobs_status";'
    );

  }

};