const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjc1MDA2ODI3LCJleHAiOjE2NzUwOTMyMjd9.REKqYzObQyfMtXoW8NnNrCp7k4cl2XgSFq3vbIS_eg8';

const customerMock = {
  dataValues: {
    email: 'email@email.com',
    id: '1',
    name: 'Pessoa da Silva',
    role: 'customer',
  }
};

const sellerMock = {
  dataValues: {
    email: 'email@email.com',
    id: '2',
    name: 'Pessoa da Silva',
    role: 'seller',
  }
};

const productsMock = [
  {
    id: 1,
    name: 'Skol Lata 250ml',
    price: 2.20,
    url_image: 'http://localhost:3001/images/skol_lata_350ml.jpg',
  },
  {
    id: 2,
    name: 'Heineken 600ml',
    price: 7.50,
    url_image: 'http://localhost:3001/images/heineken_600ml.jpg',
  },
];

const saleMock = {
  dataValues: {
    id: 1
  }
};

module.exports = { tokenMock, customerMock, productsMock, sellerMock, saleMock };