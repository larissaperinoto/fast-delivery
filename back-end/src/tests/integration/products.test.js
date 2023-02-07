const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../api/app');
const { Product } = require('../../database/models');
const { productsMock } = require('./mock');

const { expect } = chai;

describe('Testa a rota /products', () => {

  afterEach(function() { sinon.restore() });

  describe('Testa método POST na rota /products', () => {
    it('Retorna todos os produtos cadastrados', async () => {
      sinon.stub(Product, "findAll").resolves(productsMock);

      const response = await chai
              .request(app)
              .get('/products');

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal(productsMock);
    });
  });
});
