import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Navbar from '../components/Navbar';
import { getSaleById, putSaleStatus } from '../services/requests';
import Context from '../context/Context';

function SellerOrderDetails() {
  const { id } = useParams();
  const [salesOrderDetails, setSalesOrdersDetails] = useState([]);
  const [total, setTotal] = useState([]);
  const { disabledButton, setDisableButon } = useContext(Context);

  const salesProducts = 'sales_products';

  useEffect(() => {
    const request = async () => {
      const result = await getSaleById((id));
      console.log(result);
      setSalesOrdersDetails(result);
    };
    request();
  }, []);

  const handleClick = async (status, idOrder) => {
    const conditional = {
      preparando: 'Preparando',
      transito: 'Em Trânsito',
      entregue: 'Entregue',
    };
    setDisableButon(conditional[status]);
    await putSaleStatus(idOrder, conditional[status]);
  };

  useEffect(() => {
    if (salesOrderDetails[0] && salesOrderDetails[0].status !== disabledButton) {
      setDisableButon(salesOrderDetails[0].status);
    }
  }, [salesOrderDetails]);

  // console.log(salesOrderDetails[0].status);

  useEffect(() => {
    setTotal(salesOrderDetails
      .map((order) => order[salesProducts]
        .map((product) => Number(product.price) * product.SalesProduct.quantity))[0]);
  }, [salesOrderDetails]);

  // console.log(salesOrderDetails.map((order) => order.status)[0]);
  const dataStatus = 'seller_order_details__element-order-details-label-delivery-status';

  return (
    <>
      <Navbar />
      {
        salesOrderDetails.map((order) => (
          <div key={ order.id }>
            <p>Detalhe do pedido</p>
            <p
              data-testid="seller_order_details__element-order-details-label-order-id"
            >
              {order.id}
            </p>
            <p
              data-testid="seller_order_details__element-order-details-label-order-date"
            >
              { moment(order.salesDate).format('DD/MM/YYYY') }
            </p>
            <div
              data-testid={ dataStatus }
            >
              {disabledButton}
            </div>
            <button
              data-testid="seller_order_details__button-preparing-check"
              type="button"
              onClick={ () => handleClick('preparando', order.id) }
              disabled={ disabledButton !== 'Pendente' }
            >
              PREPARAR PEDIDO
            </button>
            <button
              data-testid="seller_order_details__button-dispatch-check"
              type="button"
              onClick={ () => handleClick('transito', order.id) }
              disabled={ disabledButton !== 'Preparando' }
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
                {
                  order[salesProducts].map((product, i) => (

                    <tr key={ `${order.id}${product.id}` }>
                      <th
                        data-testid={
                          `seller_order_details__element-order-table-item-number-
                  ${order.id}`
                        }
                      >
                        {i + 1}
                      </th>
                      <th
                        data-testid={ `seller_order_details__element-order-table-name-
              ${order.id}` }
                      >
                        {product.name}
                      </th>
                      <th
                        data-testid={ `seller_order_details__element-order-table-quantity-
              ${order.id}` }
                      >
                        {product.SalesProduct.quantity}
                      </th>
                      <th
                        data-testid={
                          `seller_order_details__element-order-
                          table-unit-price-${order.id}`
                        }
                      >
                        {product.price.toString().replace(/\./, ',')}
                      </th>
                      <th
                        data-testid={ `seller_order_details__element
                        -order-table-sub-total-
              ${order.id}` }
                      >
                        { (product.price * product.SalesProduct.quantity)
                          .toFixed(2).replace('.', ',') }
                      </th>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        ))
      }

      <div
        data-testid="seller_order_details__element-order-total-price"
      >
        Total:
        {' '}
        {total !== undefined ? total
          .reduce((acc, curr) => acc + curr, 0).toFixed(2)
          .toString().replace(/\./, ',')
          : 0}
      </div>
    </>
  );
}

export default SellerOrderDetails;
