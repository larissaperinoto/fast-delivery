import React, { useEffect, useState } from 'react';
import { postRegistration } from '../services/requests';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [serverMessage, setServerMessage] = useState('');

  const checkFormat = () => {
    const ELEVEN = 11;
    const FIVE = 5;
    const validName = name.length > ELEVEN;
    const validEmail = (/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/).test(email);
    const validPassword = password.length > FIVE;
    if (validName && validEmail && validPassword) return setDisabled(false);
    setDisabled(true);
  };

  useEffect(() => {
    checkFormat();
  }, [name, email, password]);

  const registerNewUser = async (e, body) => {
    e.preventDefault();
    const response = await postRegistration(body);
    setServerMessage(response.message);
  };

  return (
    <form>
      <label htmlFor="nome-de-registro">
        Nome
        <input
          type="name"
          placeholder="Seu nome"
          data-testid="common_register__input-name"
          onChange={ ({ target }) => setName(target.value) }
          value={ name }
        />
      </label>
      Email
      <label htmlFor="email-de-registro">
        <input
          type="email"
          placeholder="seuemail@exemplo.com"
          data-testid="common_register__input-email"
          onChange={ ({ target }) => setEmail(target.value) }
          value={ email }
        />
      </label>
      <label htmlFor="registro-password">
        Senha
        <input
          type="password"
          placeholder="********"
          data-testid="common_register__input-password"
          onChange={ ({ target }) => setPassword(target.value) }
          value={ password }
        />
      </label>
      <button
        type="submit"
        data-testid="common_register__button-register"
        disabled={ disabled }
        onClick={ (e) => registerNewUser(e, { name, email, password, role: 'customer' }) }
      >
        Cadastrar
      </button>

      <p
        data-testid="common_register__element-invalid_register"
      >
        {serverMessage}
      </p>
    </form>
  );
}
