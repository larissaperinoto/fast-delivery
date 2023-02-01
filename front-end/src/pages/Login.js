import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { postLogin } from '../services/requests';

export default function Login() {
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const history = useNavigate();

  const redirectTo = (role) => {
    switch (role) {
    case 'customer':
      history('/customer/products');
      break;
    case 'administrator':
      history('/admin/manage');
      break;
    case 'seller':
      history('/seller/orders');
      break;
    default:
      break;
    }
  };

  const validateLogin = async () => {
    const userData = await postLogin(email, password);

    if (userData !== 'Not found') {
      localStorage.setItem('user', JSON.stringify(userData));
      redirectTo(userData.role);
    } else {
      setInvalidEmail(!invalidEmail);
      setErrorMessage('Email não encontrado');
    }
  };

  useEffect(() => {
    // localStorage.removeItem('user');
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      redirectTo(user.role);
    }
  }, []);

  const checkPassword = () => {
    const minPasswordCharacters = 6;
    return password.length >= minPasswordCharacters;
  };
  const checkEmail = () => {
    const validEmail = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return email.match(validEmail);
  };

  useEffect(() => {
    if (checkEmail() && checkPassword()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  return (
    <form onSubmit={ (e) => e.preventDefault() }>
      <label htmlFor="common_login__input-email">
        <input
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          type="email"
          placeholder="Email"
          data-testid="common_login__input-email"
        />
      </label>
      {
        invalidEmail && (
          <p data-testid="common_login__element-invalid-email">
            { errorMessage }
          </p>
        )
      }
      <label htmlFor="common_login__input-password">
        <input
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
          type="password"
          placeholder="Password"
          data-testid="common_login__input-password"
        />
      </label>
      <button
        type="submit"
        data-testid="common_login__button-login"
        onClick={ () => validateLogin() }
        disabled={ disabled }
      >
        Login
      </button>
      <Link to="/register">
        <button
          type="button"
          data-testid="common_login__button-register"
        >
          Ainda não tenho conta
        </button>
      </Link>
    </form>
  );
}
