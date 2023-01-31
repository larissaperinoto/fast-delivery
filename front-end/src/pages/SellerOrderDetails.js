import Navbar from '../components/navbar';

function SellerOrderDetails() {
  const [order, setOrder] = useState({});

  return (
    <>
      <Navbar />
      <p>Detalhe do pedido</p>
      <p
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        { id }
      </p>
      <p
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        { saleDate }
      </p>
      <div
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        { statusProduct }
      </div>
      <button
        data-testid="seller_order_details__button-preparing-check"
        type="button"
      >
        PREPARAR PEDIDO
      </button>
      <button
        data-testid="seller_order_details__button-dispatch-check"
        type="button"
        disabled
      >
        SAIU PARA ENTREGA
      </button>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          <tr key={ i }>
            <th
              data-testid={
                `seller_order_details__element-order-table-item-number-
                  ${id}`
              }
            >
              {id}
            </th>
            <th
              data-testid={ `seller_order_details__element-order-table-name-
              ${id}` }
            >
              {sellerName}
            </th>
            <th
              data-testid={ `seller_order_details__element-order-table-quantity-
                ${id}` }
            >
              {quantity}
            </th>
            <th
              data-testid={
                `seller_order_details__element-order-table-unit-price-${id}`
              }
            >
              {price}
            </th>
            <th
              data-testid={ `seller_order_details__element-order-table-sub-total-
                ${id}` }
            >
              { (product.price * quantity)
                .toFixed(2).replace('.', ',') }
            </th>
          </tr>
        </tbody>
      </table>

      <div>
        Total:
        <div
          data-testid="seller_order_details__element-order-total-price"
        />
      </div>
    </>
  );
}

export default SellerOrderDetails;
