module.exports = {
    up: async (queryInterface, _Sequelize) => {
      await queryInterface.bulkInsert('users',
        [{
          id: 1,
          name: 'Pesoa Administradora',
          email: 'admin@email.com',
          password: '1a27d614b89606d43c920311a7829245',
          role: 'administrator',
        },
        {
          id: 2,
          name: 'Pessoa Vendedora Um',
          email: 'seller@email.com',
          password: '3074930355dc940a7fba837179edd25e',
          role: 'seller',
        },
        {
          id: 3,
          name: 'Pessoa Cliente Um',
          email: 'costumer@email.com',
          password: '1c37466c159755ce1fa181bd247cb925',
          role: 'customer',
        },
        ], { timestamps: false });
    },

    down: async (queryInterface, _Sequelize) => {
      await queryInterface.bulkDelete('users', null, {});
    },
  };