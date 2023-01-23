import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import React from 'react';
import Products from '../pages/Products';

describe('Testa o componente Products', () => {
  test('Verifica se os elementos da barra nav estão presentes na tela', () => {
    render(<BrowserRouter><Products /></BrowserRouter>);
    expect(screen.getByTestId('customer_products__element-navbar-link-products'))
      .toBeInTheDocument();
    expect(screen.getByTestId('customer_products__element-navbar-link-orders'))
      .toBeInTheDocument();
    expect(screen.getByTestId('customer_products__element-navbar-user-full-name'))
      .toBeInTheDocument();
    expect(screen.getByTestId('customer_products__element-navbar-link-logout'))
      .toBeInTheDocument();
  });
});
