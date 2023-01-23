import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
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
});
