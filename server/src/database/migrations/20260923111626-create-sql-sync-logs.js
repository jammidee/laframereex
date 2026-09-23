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
 * CREATED DATE : September 23, 2026 7:14 PM
 * ------------------------------------------------------------------------
 */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {

    await queryInterface.createTable('sql_sync_logs', {

      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      entityid: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: '_NA_'
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
      },

      action_type: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'SQL_EXECUTION'
      },

      sql_command: {
        type: Sequelize.TEXT,
        allowNull: false
      },

      action_details: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      execution_time_ms: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0
      },

      can_replay: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      },

      sync_status: {
        type: Sequelize.STRING(36),
        allowNull: true,
        defaultValue: 'PENDING'
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      severity: {
        type: Sequelize.ENUM('INFO', 'WARNING', 'ERROR'),
        allowNull: true,
        defaultValue: 'INFO'
      },

      is_suspicious: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: false
      },

      sstatus: {
        type: Sequelize.STRING(36),
        allowNull: true,
        defaultValue: 'ACTIVE'
      },

      pid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },

      userid: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      },

      deleted: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      }

    });

    // Indexes for performance, filtering, and replication queue processing
    await queryInterface.addIndex('sql_sync_logs', ['user_id']);
    await queryInterface.addIndex('sql_sync_logs', ['action_type']);
    await queryInterface.addIndex('sql_sync_logs', ['can_replay']);
    await queryInterface.addIndex('sql_sync_logs', ['sync_status']);
    await queryInterface.addIndex('sql_sync_logs', ['created_at']);
    await queryInterface.addIndex('sql_sync_logs', ['entityid']);
  },

  async down(queryInterface, Sequelize) {

    // Drop table and PostgreSQL ENUM type safely
    await queryInterface.dropTable('sql_sync_logs');
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_sql_sync_logs_severity";'
    );

  }

};