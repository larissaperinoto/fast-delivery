import React, { useEffect, useState } from 'react';
import { requestProducts } from '../services/requests';
import Navbar from '../components/navbar';
import ProductsCard from '../components/productsCard';

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productsRequest = async () => {
      const productsList = await requestProducts();
      console.log('oi', productsList);
      setProducts(productsList);
    };
    productsRequest();
  }, []);

  console.log(products);
  return (
    <div>
      <Navbar />
      <section>
        {products.map(({ id, image, name, price }) => (
          <ProductsCard
            key={ id }
            id={ id }
            imageUrl={ image }
            name={ name }
            price={ price }
          />
        ))}
      </section>
    </div>
  );
}

export default Products;
// import React, { useEffect, useState } from 'react';
// import { requestProducts } from '../services/requests';

// export default function Products() {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const productsRequest = async () => {
//       const productsList = await requestProducts();
//       console.log('oi', productsList);
//       setProducts(productsList);
//     };
//     productsRequest();
//   }, []);

//   console.log(products);

//   return (
//     <div>
//       <nav>
//         <div data-testid="customer_products__element-navbar-link-products" />
//         <div data-testid="customer_products__element-navbar-link-orders" />
//         <div data-testid="customer_products__element-navbar-user-full-name" />
//         <div data-testid="customer_products__element-navbar-link-logout" />
//       </nav>
//     </div>
//   );
// }
