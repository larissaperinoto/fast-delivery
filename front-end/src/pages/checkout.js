import React, { useContext, useEffect } from 'react';
import Navbar from '../components/navbar';
import Context from '../context/Context';

export default function Checkout() {
  const { orders, totalPrice, ordersCheckout, setOrdersCheckout } = useContext(Context);

  const ordersArray = orders.map(({ id }) => orders.filter((e) => e.id === id))
    .filter((item, index, self) => index === self.findIndex((t) => (t[0].id === item[0]
      .id && t[0].name === item[0].name && t[0].urlImage === item[0].urlImage
    )));

  useEffect(
    () => setOrdersCheckout([
      ...ordersCheckout,
      ...ordersArray.map((item, i) => ({
        item: i,
        descricao: item[0].name,
        quantidade: item.length,
        valor: Number(item[0].price.replace(/,/, '.')),
        subTotal: Number(item[0].price.replace(/,/, '.')) * item.length,
      }))]),
    [],
  );

  return (
    <div>
      <Navbar />
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor unitário</th>
            <th>Sub-total</th>
            <th>Remover item</th>
          </tr>
        </thead>
        <tbody>
          { ordersArray.map((item, i) => (
            <tr key={ item[0].name }>
              <td
                data-testid={ `customer_checkout__element-order-table-item-number-${i}` }

              >
                {i + 1}

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }

              >
                {item[0].name}

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                {item.length}

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }

              >
                {item[0].price}

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
              >
                {(Number(item[0].price
                  .replace(/,/, '.')) * item.length)
                  .toFixed(2).toString()
                  .replace(/\./, ',')}

              </td>
              <td>

                <button
                  data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                  type="button"
                >
                  Remover item
                </button>
              </td>
            </tr>
          ))}

          <p
            data-testid="customer_checkout__element-order-total-price"
          >
            R$:
            {totalPrice}
          </p>

        </tbody>
      </table>

      <p> Detalhes e endereço para entrega </p>
      <div>
        <label htmlFor="select-seller">
          Pessoa responsável:
          <select>
            <option
              data-testid="customer_checkout__select-seller"
            >
              pessoa

            </option>
          </select>

        </label>
        <label htmlFor="input-address">
          Endereço
          <input
            type="text"
            placeholder="Rua dos Guajajaras, Centro, Belo Horizonte "
            data-testid="customer_checkout__input-address"
          />
        </label>
        <label htmlFor="input-address">
          Número
          <input
            type="text"
            placeholder="40 "
            data-testid="customer_checkout__input-address-number"
          />
        </label>
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido

        </button>
        {/* reenviando commit */}
      </div>
    </div>
  );
}
