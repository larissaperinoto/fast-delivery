const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../api/app');
const { User } = require('../../database/models');
const { userMock, tokenMock } = require('./mock');
const jsonwebtoken = require('jsonwebtoken');

const { expect } = chai;

describe('Testa a rota /register', () => {

  afterEach(function() { sinon.restore() });

  describe('Testa método POST na rota /customer/orders', () => {
    it('Usuário consegue se registrar uma venda com sucesso', async () => {
      sinon.stub(jsonwebtoken, 'verify').resolves(userMock);
      sinon.stub(User, "findOne").resolves(undefined);
      sinon.stub(User, "create").resolves({});

      const response = await chai
              .request(app)
              .post('/customer/orders')
              .send({
                seller: '',
                totalPrice: '',
                deliveryAddress: '',
                deliveryNumber: '',
                products: [
                  {

                  }
                ]
              })
              .set('authorization', tokenMock);

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({ message: 'Created' });
    });
  });
});
