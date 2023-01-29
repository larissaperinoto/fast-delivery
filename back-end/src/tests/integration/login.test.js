const sinon = require('sinon');
const chai = require('chai');
const jsonwebtoken = require('jsonwebtoken');
const fs = require('fs');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../api/app');
const { User } = require('../../database/models');
const { userMock, tokenMock } = require('./mock');

const { expect } = chai;

describe('Testa a rota /login', () => {

  afterEach(function() { sinon.restore() });

  describe('Testa método POST na rota /login', () => {
    it('Usuário consegue fazer login com sucesso', async () => {
      sinon.stub(User, "findOne").resolves(userMock);
      sinon.stub(jsonwebtoken, 'sign').resolves(tokenMock);

      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'cliente@email.com',
                password: 'secret_password'
              });

      expect(response.status).to.be.equal(200);
      expect(response.body).to.be.deep.equal({ ...userMock, token: tokenMock });
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

    it('Usuário não preenche o campo email', async () => {
      sinon.stub(User, "findOne").resolves(undefined);

      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: '',
                password: 'secret_password'
              });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'Some required fields are missing' });
    });

    it('Usuário não preenche o campo password', async () => {
      sinon.stub(User, "findOne").resolves(undefined);

      const response = await chai
              .request(app)
              .post('/login')
              .send({
                email: 'client@email.com',
                password: ''
              });

      expect(response.status).to.be.equal(400);
      expect(response.body).to.be.deep.equal({ message: 'Some required fields are missing' });
    });
  });
});