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
 * CREATED DATE : September 11, 2026 01:18 AM
 * ------------------------------------------------------------------------
 * npx sequelize-cli migration:generate --name create-lookups-table
 */

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const dialect = queryInterface.sequelize.getDialect();

    // Enable Postgres Extensions (e.g., pgcrypto, uuid-ossp)
    // Execute extension creation ONLY if running on PostgreSQL
    if (dialect === 'postgres') {

      // Query installed extensions from PostgreSQL system catalog
        const [results] = await queryInterface.sequelize.query(
          `SELECT extname FROM pg_extension WHERE extname IN ('pgcrypto', 'uuid-ossp');`
        );

        const installedExtensions = results.map(row => row.extname);

        if (!installedExtensions.includes('pgcrypto')) {
          await queryInterface.sequelize.query('CREATE EXTENSION "pgcrypto";');
        }

        if (!installedExtensions.includes('uuid-ossp')) {
          await queryInterface.sequelize.query('CREATE EXTENSION "uuid-ossp";');
        }

    }

    await queryInterface.createTable('lookups', {

      id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },

      juid: {
        type: Sequelize.CHAR(36),
        allowNull: true
      },

      entityid: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null
      },

      appid: {
        type: Sequelize.STRING(36),
        allowNull: true,
        defaultValue: null
      },

      keyid: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null
      },

      itemid: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: null
      },

      description: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: null
      },

      colstr01: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: '_NA_'
      },

      colstr02: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: '_NA_'
      },

      colstr03: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: '_NA_'
      },

      colnum01: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0
      },

      colnum02: {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0
      },

      coldate01: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null
      },

      coldate02: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null
      },

      coltime01: {
        type: Sequelize.TIME,
        allowNull: true,
        defaultValue: null
      },

      coltime02: {
        type: Sequelize.TIME,
        allowNull: true,
        defaultValue: null
      },

      contact: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: '_NA_'
      },

      address: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: '_NA_'
      },

      city: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: '_NA_'
      },

      postal: {
        type: Sequelize.STRING(200),
        allowNull: true,
        defaultValue: '_NA_'
      },

      markerdate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        defaultValue: null
      },

      phone: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: '(000) 000-0000'
      },

      fax: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: '(000) 000-0000'
      },

      telex: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: '(000) 000-0000'
      },

      sstatus: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: 'ACTIVE'
      },

      pid: {
        type: Sequelize.STRING(36),
        allowNull: true,
        defaultValue: '000000'
      },

      userid: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: '_NA_'
      },

      deleted: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      }

    });

    // Indexes
    await queryInterface.addIndex('lookups', ['entityid']);
    await queryInterface.addIndex('lookups', ['appid']);
    await queryInterface.addIndex('lookups', ['keyid']);
    await queryInterface.addIndex('lookups', ['itemid']);
    await queryInterface.addIndex('lookups', ['sstatus']);
    await queryInterface.addIndex('lookups', ['pid']);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('lookups');
  }
};