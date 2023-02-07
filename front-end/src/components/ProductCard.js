import { Button, Typography, TextField } from '@mui/material';
import { Stack } from '@mui/system';
import { string, number } from 'prop-types';
import { useEffect, useContext, useState } from 'react';
import Context from '../context/Context';

function ProductCard({
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

  const addToOrder = (product) => {
    setOrders([...orders, product]);
  };

  const removeFromOrder = (productId) => {
    const withTheProduct = orders.filter((order) => order.id === productId);
    withTheProduct.pop();
    const withoutProduct = orders.filter((order) => order.id !== productId);
    setOrders([...withoutProduct, ...withTheProduct]);
  };

  const a = ({ target: { value } }) => {
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
      sx={ { padding: 2 } }
    >
      <Typography
        data-testid={ `customer_products__element-card-title-${id}` }
        variant="h6"
      >
        {name}
      </Typography>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
        width="100px"
      />
      <Typography
        data-testid={ `customer_products__element-card-price-${id}` }
        variant="body1"
      >
        { `R$ ${price}`}
      </Typography>

      <Stack direction="row" alignItems="center">
        <Button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          variant="text"
          color="secondary"
          size="small"
          onClick={ () => removeFromOrder(id) }
        >
          -
        </Button>

        <TextField
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="text"
          min="0"
          size="small"
          value={ quantity }
          onChange={ (e) => a(e) }
        />

        <Button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          variant="text"
          color="secondary"
          size="small"
          onClick={ () => addToOrder({ id, name, urlImage, price }) }
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

export default ProductCard;
