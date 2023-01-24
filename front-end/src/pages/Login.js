import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(true);

  const validateLogin = () => {
    console.log(email);
    const body = { email, password };
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => {
        setInvalidEmail(!invalidEmail);
        setErrorMessage('Email não encontrado');
        console.log(JSON.parse(error));
      });
  };
  
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
    <form onSubmit={ (e) => e.preventDefault() } >
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
