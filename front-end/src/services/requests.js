const contentType = 'application/json';
const { token } = JSON.parse(localStorage.getItem('user')) || '';
const baseURL = `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}`;

export async function methodGet(route) {
  const response = await fetch(`${baseURL}${route}`, {
    method: 'GET',
    headers: {
      'Content-Type': contentType,
      Authorization: token,
    },
  });
  const data = await response.json();
  return data;
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

export async function putSaleStatus(id, status) { // Atualiza uma venda pelo ID
  const response = await fetch(`http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}/seller/orders/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      Authorization: token,
    },
    body: JSON.stringify({ status }),
  });
  const data = await response.json();
  return data;
}
