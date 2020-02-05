module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert(
      'Delivery',
      [
        {
          id: 1,
          client_id: 3,
          partner_id: 1,
          product: 'Pizza Calabresa',
          value: 40.5,
          created_at: '$now',
          updated_at: '$now',
          deleted_at: null,
        },
        {
          id: 2,
          client_id: 4,
          partner_id: 1,
          product: 'Pizza Bacon c/ Ovos',
          value: '45.00',
          delivered_at: null,
          created_at: '$now',
          updated_at: '$now',
          deleted_at: null,
        },
        {
          id: 3,
          client_id: 3,
          partner_id: 2,
          product: 'Pizza Bacon c/ Ovos',
          value: '45.00',
          delivered_at: null,
          created_at: '$now',
          updated_at: '$now',
          deleted_at: null,
        },
        {
          id: 4,
          client_id: 4,
          partner_id: 2,
          product: 'Pizza Bacon c/ Ovos',
          value: '45.00',
          delivered_at: null,
          created_at: '$now',
          updated_at: '$now',
          deleted_at: null,
        },
      ],
      {}
    ),

  down: queryInterface => queryInterface.bulkDelete('Delivery', null, {}),
};
