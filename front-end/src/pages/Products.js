import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { methodGet } from '../services/requests';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Context from '../context/Context';

function Products() {
  const [products, setProducts] = useState([]);
  const { totalPrice, setTotalPrice, orders } = useContext(Context);
  const history = useNavigate();

  useEffect(() => {
    const productsRequest = async () => {
      const productsList = await methodGet('/products');
      setProducts(productsList);
    };
    productsRequest();
  }, []);

  useEffect(() => {
    const total = orders
      .reduce((acc, curr) => acc + parseFloat(curr.price.replace(',', '.')), 0);
    setTotalPrice(total.toFixed(2).replace('.', ','));
  }, [orders]);

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
        onClick={ () => history('/customer/checkout') }
        sx={ { m: 2 } }
      >
        Ver carrinho
        {' '}
        <Typography>{ `R$ ${totalPrice}` }</Typography>
      </Button>
    </Container>
  );
}

export default Products;
