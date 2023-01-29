import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';

describe('Testa o componente Login', () => {
  test('Ocorre o redirecionamento para a página de /login ao renderizar o app', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    const history = window.location.pathname;
    expect(history).toBe('/login');
  });

  test('Verifica se o formulário de login está na tela', () => {
    render(<BrowserRouter><App /></BrowserRouter>);
    expect(screen.getByTestId('common_login__input-email')).toBeInTheDocument();
    expect(screen.getByTestId('common_login__input-password')).toBeInTheDocument();
    expect(screen.getByTestId('common_login__button-login')).toBeInTheDocument();
    expect(screen.getByTestId('common_login__button-register')).toBeInTheDocument();
  });

  test('O botão é habilidado quando o campo email e senha são preenchidos', () => {
    render(<BrowserRouter><App /></BrowserRouter>);

    const emailInput = screen.getByTestId('common_login__input-email');
    const senhaInput = screen.getByTestId('common_login__input-password');
    const loginSubmitBtn = screen.getByTestId('common_login__button-login');

    expect(loginSubmitBtn.disabled).toBe(true);

    userEvent.type(emailInput, 'email@mail.com');
    userEvent.type(senhaInput, '1234567');

    expect(loginSubmitBtn.disabled).toBe(false);
  });

  test('É possível navegar para a página de registro', async () => {
    render(<BrowserRouter><App /></BrowserRouter>);

    const registerButton = screen.getByTestId('common_login__button-register');
    userEvent.click(registerButton);

    const { pathname } = window.location;

    expect(pathname).toBe('/register');
  });
});
