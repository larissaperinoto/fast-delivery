const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../api/app');
const { Sale, SalesProduct } = require('../../database/models');
const { saleMock, tokenMock, customerMock } = require('./mock');
const jsonwebtoken = require('jsonwebtoken');

const { expect } = chai;

describe('Testa rotas para a tabela Sales', () => {

  afterEach(function() { sinon.restore() });

  describe('Testa método GET para rota /sales/:id', () => {
    it('É possível buscar uma venda pelo Id', async () => {
      sinon.stub(jsonwebtoken, 'verify').returns({ ...customerMock.dataValues });
      sinon.stub(Sale, "findOne").resolves(saleMock);

      const response = await chai
              .request(app)
              .get('/sales/1')
              .set('authorization', tokenMock);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ ...saleMock.dataValues });
    });

    it('Busca uma venda pelo Id que não existe', async () => {
      sinon.stub(jsonwebtoken, 'verify').returns({ ...customerMock.dataValues });
      sinon.stub(Sale, "findOne").resolves(undefined);

      const response = await chai
              .request(app)
              .get('/sales/1')
              .set('authorization', tokenMock);

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.deep.equal('Not found');
    });
  });

  describe('Testa método GET para rota /sales/user', () => {
    it('É possível buscar uma lista de vendas pelo id do usuário', async () => {
      sinon.stub(jsonwebtoken, 'verify').returns({ ...customerMock.dataValues });
      sinon.stub(Sale, "findAll").resolves([ saleMock.dataValues ]);

      const response = await chai
              .request(app)
              .get('/sales/user')
              .set('authorization', tokenMock);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal([ saleMock.dataValues ]);
    });
  });

  describe('Testa método POST para rota /sales', () => {
    it('É possível cadastrar uma nova venda', async () => {
      sinon.stub(jsonwebtoken, 'verify').returns({ ...customerMock.dataValues });
      sinon.stub(Sale, "create").resolves(saleMock.dataValues);
      sinon.stub(SalesProduct, "bulkCreate");

      const response = await chai
              .request(app)
              .post('/sales')
              .send({
                ...saleMock.dataValues
              })
              .set('authorization', tokenMock);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal(saleMock.dataValues);
    });
  });

  describe('Testa método PUT para rota /sales/:id', () => {
    it('É possível cadastrar uma nova venda', async () => {
      sinon.stub(jsonwebtoken, 'verify').returns({ ...customerMock.dataValues });
      sinon.stub(Sale, "update").resolves(saleMock.dataValues);

      const response = await chai
              .request(app)
              .put('/sales/1')
              .send({
                status: "Em trânsito"
              })
              .set('authorization', tokenMock);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal('Updated');
    });
  });
});
