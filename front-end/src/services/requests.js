const { token } = JSON.parse(localStorage.getItem('user')) || '';

const HOST = process.env.REACT_APP_API_HOST || 'localhost';
const PROTOCOL = process.env.REACT_APP_API_PROTOCOL || 'http';

const baseURL = `${PROTOCOL}://${HOST}`;

const contentType = 'application/json';

const headersParams = {
  'Content-Type': contentType,
  Authorization: token,
};

export async function methodGet(route) {
  const response = await fetch(`${baseURL}${route}`, {
    method: 'GET',
    headers: headersParams,
  });
  const data = await response.json();
  return data;
}

export async function methodPost(body, route) {
  const response = await fetch(`${baseURL}${route}`, {
    method: 'POST',
    headers: headersParams,
    body: JSON.stringify(body),
  });
  const data = await response.json();
  console.log(data);
  return data;
}

export async function methodPut(body, route) {
  const response = await fetch(`${baseURL}${route}`, {
    method: 'PUT',
    headers: headersParams,
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data;
}

export async function methodDelete(route) {
  const response = await fetch(`${baseURL}${route}`, {
    method: 'DELETE',
    headers: headersParams,
  });
  const data = await response.json();
  return data;
}
