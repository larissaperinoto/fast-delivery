// const { token } = JSON.parse(localStorage.getItem('userData'));

export async function requestProducts() {
  const response = await fetch('http://localhost:3004/products', {
    method: 'GET',
  });
  const products = await response.json();
  console.log(products);
  return products;
}

export async function postLogin(email, password) {
  const response = await fetch(`http://localhost:${process.env.API_PORT || '3001'}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const userData = await response.json();
  return userData;
}
