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
 * CREATED DATE : September 11, 2026 01:52 AM
 * ------------------------------------------------------------------------
 * npx sequelize-cli seed:generate --name seed-lookups
 */

'use strict';

const crypto = require('crypto');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const defaultRow = {
      entityid: 'LALULLA',
      appid: 'CGONE',
      colstr01: '_NA_',
      colstr02: '_NA_',
      colstr03: '_NA_',
      colnum01: 0,
      colnum02: 0,
      coldate01: null,
      coldate02: null,
      coltime01: null,
      coltime02: null,
      contact: '_NA_',
      address: '_NA_',
      city: '_NA_',
      postal: '_NA_',
      markerdate: null,
      phone: '(000) 000-0000',
      fax: '(000) 000-0000',
      telex: '(000) 000-0000',
      sstatus: 'ACTIVE',
      pid: '000000',
      userid: '_NA_',
      deleted: 0
    };

    const seeds = [
      // GENDER
      { keyid: 'GENDER', itemid: 'MALE', description: 'Male' },
      { keyid: 'GENDER', itemid: 'FEMALE', description: 'Female' },

      // MARITAL-STATUS
      { keyid: 'MARITAL-STATUS', itemid: 'SINGLE', description: 'Single' },
      { keyid: 'MARITAL-STATUS', itemid: 'MARRIED', description: 'Married' },
      { keyid: 'MARITAL-STATUS', itemid: 'WIDOWED', description: 'Widowed' },
      { keyid: 'MARITAL-STATUS', itemid: 'SEPARATED', description: 'Separated' },
      { keyid: 'MARITAL-STATUS', itemid: 'DIVORCED', description: 'Divorced' },

      // EDUCATION (Philippines Educational Attainment)
      { keyid: 'EDUCATION', itemid: 'ELEM', description: 'Elementary Graduate' },
      { keyid: 'EDUCATION', itemid: 'HS', description: 'High School Graduate' },
      { keyid: 'EDUCATION', itemid: 'SHS', description: 'Senior High School Graduate' },
      { keyid: 'EDUCATION', itemid: 'VOCATIONAL', description: 'Vocational / Technical Course' },
      { keyid: 'EDUCATION', itemid: 'COLLEGE_UNDERG', description: 'College Undergraduate' },
      { keyid: 'EDUCATION', itemid: 'BACHELORS', description: 'Bachelor\'s Degree' },
      { keyid: 'EDUCATION', itemid: 'MASTERS', description: 'Master\'s Degree' },
      { keyid: 'EDUCATION', itemid: 'DOCTORATE', description: 'Doctorate / Ph.D.' },

      // CURRENCY
      { keyid: 'CURRENCY', itemid: 'PHP', description: 'Philippine Peso' },
      { keyid: 'CURRENCY', itemid: 'USD', description: 'US Dollar' },
      { keyid: 'CURRENCY', itemid: 'JPY', description: 'Japanese Yen' },
      { keyid: 'CURRENCY', itemid: 'EUR', description: 'Euro' },

      // LANGUAGE
      { keyid: 'LANGUAGE', itemid: 'ENGLISH', description: 'English' },
      { keyid: 'LANGUAGE', itemid: 'FILIPINO', description: 'Filipino' },
      { keyid: 'LANGUAGE', itemid: 'SPANISH', description: 'Spanish' },
      { keyid: 'LANGUAGE', itemid: 'FRENCH', description: 'French' },

      // DEPARTMENT
      { keyid: 'DEPARTMENT', itemid: 'HR', description: 'Human Resources' },
      { keyid: 'DEPARTMENT', itemid: 'PURCHASING', description: 'Purchasing' },
      { keyid: 'DEPARTMENT', itemid: 'OPERATIONS', description: 'Operations' },
      { keyid: 'DEPARTMENT', itemid: 'DEVELOPMENT', description: 'Development' },
      { keyid: 'DEPARTMENT', itemid: 'FINANCE', description: 'Finance' },
      { keyid: 'DEPARTMENT', itemid: 'EXECUTIVE', description: 'Executive' }
    ];

    const records = seeds.map(item => ({
      juid: crypto.randomUUID(),
      ...defaultRow,
      ...item
    }));

    await queryInterface.bulkInsert('lookups', records, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('lookups', {
      entityid: 'LALULLA',
      appid: 'CGONE',
      keyid: ['GENDER', 'MARITAL-STATUS', 'EDUCATION', 'CURRENCY', 'LANGUAGE', 'DEPARTMENT']
    }, {});
  }
};