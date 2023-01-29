const tokenMock = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjozLCJuYW1lIjoiQ2xpZW50ZSBaw6kgQmlyaXRhIiwiZW1haWwiOiJ6ZWJpcml0YUBlbWFpbC5jb20iLCJyb2xlIjoiY3VzdG9tZXIifSwiaWF0IjoxNjc1MDA2ODI3LCJleHAiOjE2NzUwOTMyMjd9.REKqYzObQyfMtXoW8NnNrCp7k4cl2XgSFq3vbIS_eg8';

const userMock = {
  email: 'cliente@email.com',
  id: '1',
  name: 'Cliente da Silva',
  role: 'customer',
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


module.exports = { tokenMock, userMock, productsMock };