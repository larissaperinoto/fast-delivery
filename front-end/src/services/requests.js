const { token } = JSON.parse(localStorage.getItem('user')) || '';

const baseURL = `http://localhost:${process.env.REACT_APP_BACKEND_PORT || '3001'}`;

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
