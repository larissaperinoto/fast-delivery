import { BrowserRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import Provider from '../context/Provider';
import { userMock, productsMock } from './mock';

describe('Testa o componente Login', () => {
  test('Ocorre o redirecionamento para a página de /login ao renderizar o app', () => {
    render(<Provider><BrowserRouter><App /></BrowserRouter></Provider>);
    const history = window.location.pathname;
    expect(history).toBe('/login');
  });

  test('Verifica se o formulário de login está na tela', () => {
    render(<Provider><BrowserRouter><App /></BrowserRouter></Provider>);
    expect(screen.getByTestId('common_login__input-email')).toBeInTheDocument();
    expect(screen.getByTestId('common_login__input-password')).toBeInTheDocument();
    expect(screen.getByTestId('common_login__button-login')).toBeInTheDocument();
    expect(screen.getByTestId('common_login__button-register')).toBeInTheDocument();
  });

  test('O botão é habilidado quando o campo email e senha são preenchidos', async () => {
    render(<Provider><BrowserRouter><App /></BrowserRouter></Provider>);

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue('')
        .mockResolvedValueOnce(userMock)
        .mockResolvedValueOnce(productsMock),
    });

    const emailInput = screen.getByTestId('common_login__input-email');
    const senhaInput = screen.getByTestId('common_login__input-password');
    const loginSubmitBtn = screen.getByTestId('common_login__button-login');

    expect(loginSubmitBtn.disabled).toBe(true);

    userEvent.type(emailInput, 'email@mail.com');
    userEvent.type(senhaInput, '1234567');

    expect(loginSubmitBtn.disabled).toBe(false);
    userEvent.click(loginSubmitBtn);

    await waitFor(() => expect(fetch).toBeCalled());
  });

  test('É possível navegar para a página de registro', async () => {
    render(<Provider><BrowserRouter><App /></BrowserRouter></Provider>);

    const registerButton = screen.getByTestId('common_login__button-register');
    userEvent.click(registerButton);

    const { pathname } = window.location;

    expect(pathname).toBe('/register');
  });
});
