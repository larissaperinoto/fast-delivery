import React, { useState } from 'react';
// import { useHistory } from 'react-router-dom';

export default function Login() {
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateLogin = () => {
    console.log(email);
    const body = { email, password };
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => {
        setInvalidEmail(!invalidEmail);
        setErrorMessage('Email não encontrado');
        console.log(JSON.parse(error));
      });
  }

  return (
    <form onSubmit={(e) => e.preventDefault()} >
      <label htmlFor="common_login__input-email">
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          data-testid="common_login__input-email"
          value={email}
        />
      </label>
      { invalidEmail && <p data-testid="common_login__element-invalid-email">{ errorMessage }</p> }
      <label htmlFor="common_login__input-password">
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          data-testid="common_login__input-password"
          value={password}
        />
      </label>
      <button 
        type="submit" 
        data-testid="common_login__button-login"
        onClick={() => validateLogin()}
      >
        Login
      </button>
      <button
        type="button"
        data-testid="common_login__button-register"
      >
        Ainda não tenho conta
      </button>
    </form>
  );
}
