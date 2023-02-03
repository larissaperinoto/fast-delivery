import React, { useEffect, useState } from 'react';
import { postRegistration } from '../services/requests';

export default function AdminManage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [disabled, setDisabled] = useState(true);
  const [messageFromDB, setMessageFromDB] = useState('');

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

  const registerNewSeller = async (e) => {
    e.preventDefault();
    const { token } = JSON.parse(localStorage.getItem('user'));
    const body = { name, email, password, role };
    const { message } = await postRegistration(body, token, '/seller');
    setMessageFromDB(message);
  };

  return (
    <>
      <form>
        <h1>Cadastrar novo usuário</h1>
        <input
          type="text"
          placeholder="Nome"
          data-testid="admin_manage__input-name"
          value={ name }
          onChange={ (e) => setName(e.target.value) }
        />
        <input
          type="email"
          placeholder="Email"
          data-testid="admin_manage__input-email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
        />
        <input
          type="password"
          placeholder="Password"
          data-testid="admin_manage__input-password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
        />
        <select
          data-testid="admin_manage__select-role"
          onChange={ (e) => setRole(e.target.value) }
        >
          <option value="seller" defaultValue>Vendedor</option>
          <option value="customer">Cliente</option>

        </select>
        <button
          type="submit"
          data-testid="admin_manage__button-register"
          disabled={ disabled }
          onClick={ (e) => registerNewSeller(e) }
        >
          Cadastrar
        </button>
      </form>
      <div>
        {
          messageFromDB
          && <p data-testid="admin_manage__element-invalid-register">{ messageFromDB }</p>
        }
      </div>
    </>
  );
}
