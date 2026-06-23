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
 * CREATED DATE : June 14, 2026 04:28 PM
 * ------------------------------------------------------------------------
 * npx sequelize-cli db:migrate --seed 20260614162800-create-entitys-table.js
 * npx sequelize-cli db:migrate
 */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('entitys', {
      
      // Database internal primary auto-incrementing key for optimization
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      // Public secure ID used for external API mappings and secure URLs
      juid: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        unique: true
      },

      // Short public user-friendly handle/slug representing the workspace prefix
      display_id: {
        type: Sequelize.STRING(20),
        allowNull: false,
        unique: true
      },

      // Official or public name of the entity / company
      name: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      // General information or background about the entity
      description: {
        type: Sequelize.TEXT,
        allowNull: true
      },

      // Normalized Address Fields
      address_line1: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      address_line2: {
        type: Sequelize.STRING(255),
        allowNull: true
      },

      city: {
        type: Sequelize.STRING(100),
        allowNull: true
      },

      state_province: {
        type: Sequelize.STRING(100),
        allowNull: true
      },

      postal_code: {
        type: Sequelize.STRING(20),
        allowNull: true
      },

      country: {
        type: Sequelize.STRING(100),
        allowNull: true
      },

      // Configuration & Subscription
      execution_mode: {
        type: Sequelize.STRING(50),
        allowNull: true,
        defaultValue: 'MODE 1'
      },

      charge_type: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'BOTH'
      },

      status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'ACTIVE'
      },

      start_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      end_date: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      // Numerical Configuration (Replacing raw doubles with specific, safe types)
      max_users: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        defaultValue: 0
      },

      company_charge: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
        defaultValue: 0.00
      },

      user_charge: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
        defaultValue: 0.00
      },

      excess_charge: {
        type: Sequelize.DECIMAL(12, 2),
        allowNull: true,
        defaultValue: 0.00
      },

      quota: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: true
      },

      // Audit & System Flags
      old_juid: {
        type: Sequelize.CHAR(36),
        allowNull: true
      },

      is_deleted: {
        type: Sequelize.TINYINT(1),
        allowNull: false,
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
      }

    });

    // Performance and Lookup Optimization Indexes
    await queryInterface.addIndex('entitys', ['status'], { name: 'idx_status' });
    await queryInterface.addIndex('entitys', ['is_deleted'], { name: 'idx_is_deleted' });
  },

  async down(queryInterface, Sequelize) {
    // Rollback strategy to safely dismantle the table
    await queryInterface.dropTable('entitys');
  }
};