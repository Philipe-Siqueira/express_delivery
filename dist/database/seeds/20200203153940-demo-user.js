"use strict";const bcrypt = require('bcryptjs');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'User',
      [
        {
          id: 1,
          name: 'Philipe',
          surname: 'Siqueira',
          email: 'philipe.siqueira@expressdelivery.com',
          password_hash: bcrypt.hashSync('!Ab12345', 8),
          cellphone: 21999999990,
          partner: true,
          created_at: '$now',
          updated_at: '$now',
          deleted_at: null,
        },
        {
          id: 2,
          name: 'Ana',
          surname: 'Fernandes',
          email: 'ana.fernandes@expressdelivery.com',
          password_hash: bcrypt.hashSync('!Ab12345', 8),
          cellphone: 21999999991,
          partner: true,
          created_at: '$now',
          updated_at: '$now',
          deleted_at: null,
        },
        {
          id: 3,
          name: 'João',
          surname: 'Silva',
          email: 'joao.silva@email.com',
          password_hash: bcrypt.hashSync('!Ab12345', 8),
          cellphone: 21999999992,
          partner: false,
          created_at: '$now',
          updated_at: '$now',
          deleted_at: null,
        },
        {
          id: 4,
          name: 'Pedro',
          surname: 'Souza',
          email: 'pedro.souza@email2.com',
          password_hash: bcrypt.hashSync('!Ab12345', 8),
          cellphone: 21999999993,
          partner: false,
          created_at: '$now',
          updated_at: '$now',
          deleted_at: null,
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('User', null, {}),
};
