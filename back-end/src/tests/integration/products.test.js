const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../api/app');
const { Product } = require('../../database/models');
const { productsMock, tokenMock } = require('./mock');
const jsonwebtoken = require('jsonwebtoken');

const { expect } = chai;

describe('Testa a rota /products', () => {

  afterEach(function() { sinon.restore() });

  describe('Testa método POST na rota /products', () => {
    it('Retorna todos os produtos cadastrados', async () => {
      sinon.stub(Product, "findAll").resolves(productsMock);
      sinon.stub(jsonwebtoken, 'verify');

      const response = await chai
              .request(app)
              .get('/products')
              .set('authorization', tokenMock);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(productsMock);
    });
  });
});
