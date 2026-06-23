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
 * CREATED DATE : June 05, 2026 12:52 AM
 * ------------------------------------------------------------------------
 * npx sequelize-cli db:migrate --seed 20260602014500-create-user-recent-activity.js
 * npx sequelize-cli db:migrate
 */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {

  async up(queryInterface, Sequelize) {

    // ---------------------------------------------------------------------
    // User Recent Activity Migration (June 02, 2026)
    // Tracks user interaction logs across system modules with access rank capping
    // ---------------------------------------------------------------------

    await queryInterface.createTable('user_recent_activity', {

      user_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true
      },

      module_id: {
        type: Sequelize.STRING(50),
        allowNull: false,
        primaryKey: true
      },

      module_name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },

      last_accessed: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },

      access_count: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
      }

    });

    // ---------------------------------------------------------------------
    // Optimization indexes for sorting and range queries
    // ---------------------------------------------------------------------
    await queryInterface.addIndex('user_recent_activity', ['user_id', 'last_accessed'], {
      name: 'idx_user_last_accessed'
    });

  },

  async down(queryInterface, Sequelize) {

    // ---------------------------------------------------------------------
    // Rollback - Drop table
    // ---------------------------------------------------------------------

    await queryInterface.dropTable('user_recent_activity');

  }

};