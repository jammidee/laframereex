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
 * CREATED DATE : June 14, 2026 04:45 PM
 * ------------------------------------------------------------------------
 */

'use strict';

// Crypto module to generate standardized unique UUID strings natively
const crypto = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    
    // Seed initial records into the optimized entitys table
    await queryInterface.bulkInsert('entitys', [
      {
        juid: crypto.randomUUID(),
        display_id: 'GCONE', // Matching the default system value from user template
        name: 'Cloudgate One',
        description: 'Primary cloud gateway infrastructure and communication hub.',
        address_line1: '120 Mezzanine Floor, Tordesillas St.',
        address_line2: 'Salcedo Village',
        city: 'Makati City',
        state_province: 'Metro Manila',
        postal_code: '1227',
        country: 'Philippines',
        execution_mode: 'MODE 1',
        charge_type: 'BOTH',
        status: 'ACTIVE',
        start_date: '2026-01-01',
        end_date: '2030-12-31',
        max_users: 100,
        company_charge: 5000.00,
        user_charge: 150.00,
        excess_charge: 200.00,
        quota: 500.00,
        old_juid: null,
        is_deleted: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        juid: crypto.randomUUID(),
        display_id: 'ACME',
        name: 'ACT on Me',
        description: 'Operations management and action tracking corporation.',
        address_line1: 'Penthouse Unit B, Cyber One Building',
        address_line2: 'Eastwood City Cyberpark, Bagumbayan',
        city: 'Quezon City',
        state_province: 'Metro Manila',
        postal_code: '1110',
        country: 'Philippines',
        execution_mode: 'MODE 1',
        charge_type: 'BOTH',
        status: 'ACTIVE',
        start_date: '2026-03-15',
        end_date: '2028-03-15',
        max_users: 50,
        company_charge: 3500.00,
        user_charge: 120.00,
        excess_charge: 180.00,
        quota: 250.00,
        old_juid: null,
        is_deleted: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        juid: crypto.randomUUID(),
        display_id: 'LALULLA',
        name: 'Lalulla OPC',
        description: 'Core software engineering and systems operation workspace.',
        address_line1: 'Block 4 Lot 12, Gen. Luna Highway',
        address_line2: 'Gitnang Bayan 1',
        city: 'San Mateo',
        state_province: 'Rizal',
        postal_code: '1850',
        country: 'Philippines',
        execution_mode: 'MODE 2',
        charge_type: 'BOTH',
        status: 'ACTIVE',
        start_date: '2026-01-01',
        end_date: '2036-12-31',
        max_users: 9999,
        company_charge: 0.00, // Core framework system group bypasses direct operational billing
        user_charge: 0.00,
        excess_charge: 0.00,
        quota: 9999.99,
        old_juid: null,
        is_deleted: 0,
        created_at: new Date(),
        updated_at: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Drop targeted seed metadata records safely by distinct system keys
    await queryInterface.bulkDelete('entitys', {
      display_id: ['GCONE', 'ACME', 'LALULLA']
    }, {});
  }
};