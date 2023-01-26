import { string, number } from 'prop-types';

function ProductsCard({ id, name, urlImage, price }) {
  return (
    <section>
      <span data-testid={ `customer_products__element-card-title-${id}` }>{name}</span>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        src={ urlImage }
        alt=""
      />
      <span data-testid={ `customer_products__element-card-price-${id}` }>{price}</span>

      <div>
        <button
          data-testid={ `customer_products__button-card-rm-item-${id}` }
          type="button"
        >
          -
        </button>

        <input
          data-testid={ `customer_products__input-card-quantity-${id}` }
          type="number"
          defaultValue="0"
        />

        <button
          data-testid={ `customer_products__button-card-add-item-${id}` }
          type="button"
        >
          +
        </button>
      </div>
    </section>
  );
}

ProductsCard.propTypes = {
  id: number.isRequired,
  name: string.isRequired,
  urlImage: string.isRequired,
  price: string.isRequired,
};

export default ProductsCard;
