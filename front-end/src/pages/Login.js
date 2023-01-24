import React, { useState, useEffect } from 'react';

export default function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(true);

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
    <form>
      <label htmlFor="common_login__input-email">
        <input
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          type="email"
          placeholder="Email"
          data-testid="common_login__input-email"
        />
      </label>
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
