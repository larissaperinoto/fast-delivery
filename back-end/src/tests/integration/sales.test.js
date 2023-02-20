const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../api/app');
const { Sale } = require('../../database/models');
const { saleMock, tokenMock, customerMock } = require('./mock');
const jsonwebtoken = require('jsonwebtoken');

const { expect } = chai;

describe('Testa rotas para a tabela Sales', () => {

  afterEach(function() { sinon.restore() });

  describe('Testa método GET para rota /sales/:id', () => {
    it('É possível buscar uma venda pelo Id', async () => {
      sinon.stub(jsonwebtoken, 'verify').resolves({ ...customerMock.dataValues });
      sinon.stub(Sale, "findOne").resolves(saleMock);

      const response = await chai
              .request(app)
              .get('/sales/1')
              .set('authorization', tokenMock);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ ...saleMock.dataValues });
    });
  });
});
