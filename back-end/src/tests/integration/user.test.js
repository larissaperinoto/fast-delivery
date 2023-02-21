const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../../api/app');
const { User } = require('../../database/models');
const { customerMock, tokenMock, sellerMock } = require('./mock');
const jsonwebtoken = require('jsonwebtoken');

const { expect } = chai;

describe('Testa as rotas da tabela Users', () => {

  afterEach(function() { sinon.restore() });

  describe('Testa método POST na rota /login', () => {
    it('Usuário consegue fazer login com sucesso', async () => {
      sinon.stub(User, "findOne").resolves(customerMock);
      sinon.stub(jsonwebtoken, 'sign').returns(tokenMock);

      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'email@email.com',
                password: 'secret_password'
              });

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ ...customerMock.dataValues, token: tokenMock });
    });

    it('Usuário não possui credenciais válidas', async () => {
      sinon.stub(User, "findOne").resolves(undefined);

      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'invalid@email.com',
                password: 'invalid_password'
              });

      expect(response.status).to.be.equal(404);
      expect(response.body).to.be.equal('Not found');
    });
  });

  describe('Testa método POST na rota /users', () => {
    it('Usuário consegue se registrar com sucesso', async () => {
      sinon.stub(User, "findOne").onCall(0).resolves(undefined).onCall(1).resolves(customerMock);
      sinon.stub(User, "create");
      sinon.stub(jsonwebtoken, 'sign').returns(tokenMock);

      const response = await chai
              .request(app)
              .post('/users')
              .send({
                name: 'Pessoa da Silva',
                email: 'email@email.com',
                password: 'secret_password'
              });

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ ...customerMock.dataValues, token: tokenMock });
    });

    it('Usuário tenta se registrar com credenciais já cadastradas', async () => {
      sinon.stub(User, "findOne").resolves(customerMock);

      const response = await chai
              .request(app)
              .post('/users')
              .send({
                name: 'Pessoa da Silva',
                email: 'email@email.com',
                password: 'secret_password'
              });

      expect(response.status).to.be.equal(409);
      expect(response.body).to.be.deep.equal('Conflict');
    });
  });

  describe('Testa método GET na rota /users', () => {
    it('É possível buscar por todas as pessoas cadastradas', async () => {
      sinon.stub(User, "findAll").resolves([customerMock, sellerMock]);
      sinon.stub(jsonwebtoken, 'verify');

      const response = await chai
              .request(app)
              .get('/users')
              .set('authorization', tokenMock);

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal([customerMock, sellerMock]);
    });
  });
});
