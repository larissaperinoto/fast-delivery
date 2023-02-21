import { Button, Typography, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { string, number } from 'prop-types';
import { useEffect, useContext, useState } from 'react';
import Context from '../context/Context';

export default function ProductCard({
  id,
  name,
  urlImage,
  price,
}) {
  const [quantity, setQuantity] = useState('');
  const { orders, setOrders, setTotalQuantity } = useContext(Context);

  useEffect(() => {
    const quantityByProduct = orders.filter((order) => order.id === id).length;
    setQuantity(quantityByProduct);
    setTotalQuantity(orders.length);
  }, [orders, id]);

  const removeFromOrder = (productId) => {
    const withTheProduct = orders.filter((order) => order.id === productId);
    withTheProduct.pop();
    const withoutProduct = orders.filter((order) => order.id !== productId);
    setOrders([...withoutProduct, ...withTheProduct]);
  };

  const addToOrderByInput = ({ target: { value } }) => {
    setQuantity(value);
    if (value > 0) {
      const withoutProduct = orders.filter((orderId) => orderId !== id);
      const newProducts = [];
      for (let i = 1; i <= value; i += 1) {
        newProducts.push({ id, name, urlImage, price });
      }
      setOrders([...withoutProduct, ...newProducts]);
    }
  };

  return (
    <Stack
      direction="column"
      spacing={ 2 }
      alignItems="center"
      justifyContent="center"
      sx={ { padding: 2, mt: 2, mb: 2 } }
    >
      <Typography variant="h6">{name}</Typography>
      <img
        src={ urlImage }
        alt={ name }
        height="100px"
      />
      <Typography variant="body1">{ `R$ ${price}` }</Typography>

      <Stack direction="row" alignItems="center" spacing={ 2 }>
        <Button
          type="button"
          variant="contained"
          color="secondary"
          size="small"
          onClick={ () => removeFromOrder(id) }
        >
          -
        </Button>
        <TextField
          type="text"
          min="0"
          size="small"
          value={ quantity }
          onChange={ (e) => addToOrderByInput(e) }
        />

        <Button
          type="button"
          variant="contained"
          color="secondary"
          size="small"
          onClick={ () => setOrders([...orders, { id, name, urlImage, price }]) }
        >
          +
        </Button>
      </Stack>
    </Stack>
  );
}

ProductCard.propTypes = {
  id: number,
  name: string,
  urlImage: string,
  price: string,
}.isRequired;
