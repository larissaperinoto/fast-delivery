import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { methodGet } from '../services/requests';
import Navbar from '../components/Navbar';
import ProductCard from '../components/ProductCard';
import Context from '../context/Context';

export default function Products() {
  const [products, setProducts] = useState([]);
  const { totalPrice, setTotalPrice, orders, totalQuantity } = useContext(Context);
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
    <Container maxWidth="xl" sx={ { mt: 8 } }>
      <Navbar />
      <Stack direction="column" justifyContent="center" alignItems="flex-end">
        <Typography variant="subtitle1" sx={ { mr: 4 } }>
          { `Produtos selecionados: ${totalQuantity}` }
        </Typography>
        <Button
          disabled={ !orders.length }
          type="button"
          variant="contained"
          onClick={ () => history('/customer/checkout') }
          sx={ { m: 2 } }
        >
          Ver carrinho
          {' '}
          <Typography>{ ` R$ ${totalPrice}` }</Typography>
        </Button>
      </Stack>
      <Grid
        container
        spacing={ 1 }
        alignItems="center"
        justifyContent="center"
        sx={ { mt: 5 } }
      >
        { products.length && products.map(({ id, urlImage, name, price }) => (
          <ProductCard
            key={ id }
            id={ id }
            urlImage={ urlImage }
            name={ name }
            price={ price.replace('.', ',') }
          />
        ))}
      </Grid>
    </Container>
  );
}
