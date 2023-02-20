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

export const fromNavBarRedirectTo = (role) => {
  switch (role) {
  case 'customer':
    window.location.pathname = '/customer/orders';
    break;
  case 'seller':
    window.location.pathname = '/seller/orders';
    break;
  default:
    break;
  }
};
