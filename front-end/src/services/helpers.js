export const fromLoginRedirectTo = (role) => {
  switch (role) {
  case 'customer':
    window.location.pathname = '/customer/products';
    break;
  case 'administrator':
    window.location.pathname = '/admin/manage';
    break;
  case 'seller':
    window.location.pathname = '/seller/orders';
    break;
  default:
    break;
  }
};

export const fromNavBarRedirectTo = (role, route) => {
  switch (role) {
  case 'customer':
    if (route.includes('orders')) {
      window.location.pathname = '/customer/products';
    } else {
      window.location.pathname = '/customer/orders';
    }
    break;
  case 'seller':
    window.location.pathname = '/seller/orders';
    break;
  default:
    break;
  }
};
