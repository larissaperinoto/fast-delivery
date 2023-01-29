const sinon = require('sinon');
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const app = require('../../api/app');
const { User } = require('../../database/models');
const { userMock, tokenMock } = require('./mock');

const { expect } = chai;

describe('Testa a rota /register', () => {

  afterEach(function() { sinon.restore() });

  describe('Testa método POST na rota /register', () => {
    it('Usuário consegue se registrar com sucesso', async () => {
      sinon.stub(User, "findOne").resolves(undefined);
      sinon.stub(User, "create").resolves({});

      const response = await chai
              .request(app)
              .post('/register')
              .send({
                name: 'Cliente da Silva',
                email: 'cliente@email.com',
                password: 'secret_password'
              });

      expect(response.status).to.be.equal(201);
      expect(response.body).to.be.deep.equal({ message: 'Created' });
    });

    it('Usuário tenta se registrar com credenciais já cadastradas', async () => {
      sinon.stub(User, "findOne").resolves(userMock);
      sinon.stub(User, "create").resolves({});

      const response = await chai
              .request(app)
              .post('/register')
              .send({
                name: 'Cliente da Silva',
                email: 'cliente@email.com',
                password: 'secret_password'
              });

      expect(response.status).to.be.equal(409);
      expect(response.body).to.be.deep.equal({ message: 'Conflict' });
    });
  });
});
