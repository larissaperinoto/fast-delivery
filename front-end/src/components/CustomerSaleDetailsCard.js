import React from 'react';
import PropTypes from 'prop-types';

export default function CustomerSaleDetailsCard({
  saleId,
  seller,
  saleDate,
  status,
  products,
  totalPrice,
}) {
  return (
    <div>
      <p data-testid="customer_order_details__element-order-details-label-order-id">
        { `00${saleId}`}
      </p>
      <p data-testid="customer_order_details__element-order-details-label-seller-name">
        { `P.Vendedora${seller}`}
      </p>
      <p
        data-testid="customer_order_details__element-order-details-label-order-date"
      >
        { saleDate }
      </p>
      <p
        data-testid="customer_order_details__element-order-details-label-delivery-status"
      >
        { status }
      </p>
      <button
        data-testid="customer_order_details__button-delivery-check"
        type="button"
        disabled
      >
        Marcar como entregue
      </button>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        {
          products.map(({ id, SalesProduct, price, name }) => (
            <tr key={ id }>
              <td
                data-testid={ `customer_order_details_
                    _element-order-table-item-number-${id}` }
              >
                { id }
              </td>
              <td
                data-testid={ `customer_order_details_
                    _element-order-table-name-${id}` }
              >
                { name }
              </td>
              <td
                data-testid={ `customer_order_details_
                    _element-order-table-quantity-${id}` }
              >
                { SalesProduct.quantity }
              </td>
              <td
                data-testid={ `customer_order_details_
                    _element-order-table-unit-price-${id}` }
              >
                { `R$ ${price.replace('.', ',')}` }
              </td>
              <td
                data-testid={ `customer_order_details_
                    _element-order-table-sub-total-${id}` }
              >
                { ` R$ ${(SalesProduct.quantity * price).toFixed(2).replace('.', ',')}` }
              </td>
            </tr>
          ))
        }
      </table>
      <p data-testid="customer_order_details__element-order-total-price">
        { `TOTAL R$ ${totalPrice}` }
      </p>
    </div>
  );
}

CustomerSaleDetailsCard.propTypes = {
  saleId: PropTypes.number,
  saleDate: PropTypes.string,
  seller: PropTypes.string,
  status: PropTypes.string,
  products: PropTypes.array,
  totalPrice: PropTypes.number,
}.isRequired;
