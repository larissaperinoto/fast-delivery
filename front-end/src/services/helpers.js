const redirectTo = (role) => {
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

export default redirectTo;
