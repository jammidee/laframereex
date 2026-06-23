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
 * CREATED DATE : March 28, 2026 05:31 PM
 * ------------------------------------------------------------------------
 */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {

      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      juid: {
        type: Sequelize.CHAR(36),
        allowNull: false,
        unique: true
      },

      username: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },

      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },

      email: {
        type: Sequelize.STRING(150),
        allowNull: false,
        unique: true
      },

      firstname: {
        type: Sequelize.STRING(150),
        allowNull: false
      },

      lastname: {
        type: Sequelize.STRING(150),
        allowNull: false
      },

      phone: {
        type: Sequelize.STRING(50),
        allowNull: true
      },

      gender: {
        type: Sequelize.INTEGER,
        allowNull: true,
        comment: '1=Male, 2=Female, 3=Other'
      },

      store_id: {
        type: Sequelize.BIGINT,
        allowNull: true
      },

      status: {
        type: Sequelize.STRING(20),
        allowNull: false,
        defaultValue: 'ACTIVE'
      },

      roleid: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'USER'
      },

      entityid: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'CGONE'
      },

      last_login_at: {
        type: Sequelize.DATE,
        allowNull: true
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

      deleted_at: {
        type: Sequelize.DATE,
        allowNull: true
      }

    });

    // Indexes
    await queryInterface.addIndex('users', ['username']);
    await queryInterface.addIndex('users', ['email']);
    await queryInterface.addIndex('users', ['store_id']);
    await queryInterface.addIndex('users', ['status']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};