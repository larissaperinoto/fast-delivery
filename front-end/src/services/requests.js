const contentType = 'application/json';

export async function requestProducts() { // Retorna todos os produtos do banco
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/products`, {
    method: 'GET',
  });
  const products = await response.json();
  return products;
}

export async function postLogin(email, password) { // Login para clientes, vendedores e admin
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
    },
    body: JSON.stringify({ email, password }),
  });
  const userData = await response.json();
  return userData;
}

export async function postRegistration(body, url = '') { // Registra um novo usuário como cliente
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/register${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      Authorization: token,
    },
    body: JSON.stringify(body),
  });
  const message = await response.json();
  return message;
}

export async function customerOrders() { // Retorna todos os pedidos que um usuário já fez
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/customer/orders`, {
    method: 'GET',
    Authorization: token,
  });
  const orders = await response.json();
  return orders;
}

export async function sellerOrders(sellerId) {
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/seller/orders/${sellerId}`, {
    method: 'GET',
  });
  const sellerProduct = await response.json();
  return sellerProduct;
}

export async function getAllSellers() { // Retorna todas as pessoas que são vendedoras
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/sellers`, {
    method: 'GET',
  });
  const sellers = await response.json();
  return sellers;
}

export async function postNewSale(sale) { // Registra uma nova venda
  const { token } = JSON.parse(localStorage.getItem('user'));
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/customer/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      Authorization: token,
    },
    body: JSON.stringify(sale),
  });
  const message = await response.json();
  return message;
}
