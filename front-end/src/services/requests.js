const contentType = 'application/json';
const token = JSON.parse(localStorage.getItem('user')) || '';
const baseURL = `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}`;

export async function requestProducts() { // Retorna todos os produtos do banco
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/products`, {
    method: 'GET',
  });
  const products = await response.json();
  return products;
}

export async function methodPost(body, route) {
  const response = await fetch(`${baseURL}${route}`, {
    method: 'POST',
    headers: {
      'Content-Type': contentType,
      Authorization: token,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}

export async function postRegistration(body, url = '') { // Registra um novo usuário como cliente
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
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/customer/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': contentType,
      Authorization: token,
    },
  });
  const orders = await response.json();
  return orders;
}

export async function sellerOrders() {
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/seller/orders`, {
    method: 'GET',
    headers: {
      'Content-Type': contentType,
      Authorization: token,
    },
  });
  const sellerProduct = await response.json();
  return sellerProduct;
}

export async function getSaleById(saleId) {
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/seller/orders/${saleId}`, {
    method: 'GET',
    headers: {
      'Content-Type': contentType,
      Authorization: token,
    },
  });
  const sale = await response.json();
  return sale;
}

export async function getAllSellers() { // Retorna todas as pessoas que são vendedoras
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/sellers`, {
    method: 'GET',
  });
  const sellers = await response.json();
  return sellers;
}

export async function postNewSale(sale) { // Registra uma nova venda
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

export async function putSaleStatus(id, status) { // Atualiza uma venda pelo ID
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/seller/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      Authorization: token,
    },
    body: JSON.stringify({ status }),
  });
  const message = await response.json();
  return message;
}
