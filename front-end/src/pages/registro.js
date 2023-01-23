import React from 'react';

export default function Register() {
  return (
    <form>
      <label htmlFor="nome-de-registro">
        Nome
        <input
          type="name"
          placeholder="Seu nome"
          data-testid="common_register__input-name"
        />
      </label>
      Email
      <label htmlFor="email-de-registro">
        <input
          type="email"
          placeholder="seuemail@exemplo.com"
          data-testid="common_register__input-email"
        />
      </label>
      <label htmlFor="registro-password">
        Senha
        <input
          type="password"
          placeholder="********"
          data-testid="common_register__input-password"
        />
      </label>
      <button
        type="submit"
        data-testid="common_register__button-register"
      >
        Cadastrar
      </button>

      <p
        data-testid="common_register__element-invalid_register"
      >
        suposta mensagem de erro

      </p>
    </form>
  );
}
