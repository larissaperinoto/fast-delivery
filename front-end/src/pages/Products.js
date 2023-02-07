import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { requestProducts } from '../services/requests';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
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
    <Container maxWidth="md" sx={ { mt: 5 } }>
      <Navbar />
      <Grid
        container
        spacing={ 1 }
        alignItems="center"
        justifyContent="center"
        sx={ { mt: 5 } }
      >
        {products.map(({ id, urlImage, name, price }) => (
          <ProductCard
            key={ id }
            id={ id }
            urlImage={ urlImage }
            name={ name }
            price={ price.replace('.', ',') }
          />
        ))}
      </Grid>
      <Button
        disabled={ !orders.length }
        type="button"
        variant="contained"
        data-testid="customer_products__button-cart"
        onClick={ () => checkout() }
        sx={ { m: 2 } }
      >
        Ver carrinho
        {' '}
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          { `R$ ${totalPrice}`}
        </span>
      </Button>
    </Container>
  );
}

export default Products;
