import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestProducts } from '../services/requests';
import Navbar from '../components/Navbar';
import ProductsCard from '../components/ProductCard';
import Context from '../context/Context';

function Products() {
  const [products, setProducts] = useState([]);
  const { totalPrice, setTotalPrice, orders } = useContext(Context);
  const history = useNavigate();

  useEffect(() => {
    const productsRequest = async () => {
      const productsList = await requestProducts();
      setProducts(productsList);
    };
    productsRequest();
  }, []);

  useEffect(() => {
    const total = orders
      .reduce((acc, curr) => acc + parseFloat(curr.price.replace(',', '.')), 0);
    setTotalPrice(total.toFixed(2).replace('.', ','));
  }, [orders]);

  const checkout = () => {
    history('/customer/checkout');
  };

  return (
    <div>
      <Navbar />
      <button
        disabled={ !orders.length }
        type="button"
        data-testid="customer_products__button-cart"
        onClick={ () => checkout() }
      >
        Ver carrinho
        <span data-testid="customer_products__checkout-bottom-value">{totalPrice}</span>
      </button>
      <section>
        {products.map(({ id, urlImage, name, price }) => (
          <ProductsCard
            key={ id }
            id={ id }
            urlImage={ urlImage }
            name={ name }
            price={ price.replace('.', ',') }
          />
        ))}
      </section>
    </div>
  );
}

export default Products;
