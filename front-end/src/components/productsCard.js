import { string, number } from 'prop-types';
import { useEffect, useContext, useState } from 'react';
import Context from '../context/Context';

function ProductsCard({
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
    <section>
      <span data-testid={ `customer_products__element-card-title-${id}` }>{name}</span>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt={ name }
      />
      <span data-testid={ `customer_products__element-card-price-${id}` }>{price}</span>

      <div>
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
          onClick={ () => removeFromOrder(id) }
        >
          -
        </button>

        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="text"
          min="0"
          value={ quantity }
          onChange={ (e) => a(e) }
        />

        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
          onClick={ () => addToOrder({ id, name, urlImage, price }) }
        >
          +
        </button>
      </div>
    </section>
  );
}

ProductsCard.propTypes = {
  id: number,
  name: string,
  urlImage: string,
  price: string,
}.isRequired;

export default ProductsCard;
