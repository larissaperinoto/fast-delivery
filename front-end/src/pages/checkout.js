import React from 'react';

export default function Checkout() {
  const exempleProducts = [
    {
      description: 'Cerveja stella 250ml',
      quantity: 3,
      unitPrice: 3.50,
    },
    {
      description: 'Cerveja skol latao 450ml',
      quantity: 4,
      unitPrice: 4.10,
    },
    {
      description: 'salgadinho torcida churrasco',
      quantity: 1,
      unitPrice: 1.56,
    },
  ];

  return (
    <div>
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
          { exempleProducts.map((item, i) => (
            <tr key={ item.description }>
              <td
                data-testid={ `customer_checkout__element-order-table-item-number${i}` }

              >
                index

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }

              >
                {item.description}

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                {item.quantity}

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }

              >
                {item.unitPrice}

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
              >
                {item.unitPrice * item.quantity}

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-remove-${i}` }
              >
                <button
                  type="button"
                >
                  Remover item
                </button>

              </td>
            </tr>
          ))}
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
