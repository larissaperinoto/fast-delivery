import React, { useContext, useEffect } from 'react';
import Navbar from '../components/navbar';
import Context from '../context/Context';

export default function Checkout() {
  const { orders, setOrders, totalPrice, setTotalPrice, ordersCheckout,
    setOrdersCheckout, setTotalQuantity, totalQuantity, beforeRender,
    setBeforeRender } = useContext(Context);

  // Esta variável tira a repetição de orders
  const ordersArray = orders.map(({ id }) => orders.filter((e) => e.id === id))
    .filter((item, index, self) => index === self.findIndex((t) => (t[0].id === item[0]
      .id && t[0].name === item[0].name && t[0].urlImage === item[0].urlImage
    )));

  const ONE_NEGATIVE = -1;
  // Esta variável determina quais itens vão renderizar
  let indexRender = ordersCheckout && ordersCheckout.map((_item, i) => ordersCheckout
    .findIndex((order) => (i + 1) === order.item)).filter((n) => n > ONE_NEGATIVE);

  // Esta variável organiza as ordens de pedido, deixando mais fácil de usar
  // para quem precisar das informações de checkout
  const organizationOrders = [...ordersArray.map((item, i) => ({
    item: i + 1,
    descricao: item[0].name,
    quantidade: item.length,
    valor: Number(item[0].price.replace(/,/, '.')),
    subTotal: Number(item[0].price.replace(/,/, '.')) * item.length,
  }))];

  // Lógica que ajuda na renderização correta dos itens
  useEffect(() => {
    if (totalQuantity === 0) {
      setBeforeRender(0);
    }
  }, []);

  // Lógica que ajuda na renderização correta dos itens e faz a renderização
  useEffect(() => {
    if (beforeRender === 0 && organizationOrders.length !== 0) {
      const ordersCheck = !ordersCheckout[0]
        ? setOrdersCheckout([
          ...ordersCheckout,
          ...organizationOrders,
        ])
        : setOrdersCheckout([
          ...ordersCheckout,
          ...organizationOrders,
        ].filter((_e, i) => indexRender[i] === i));
      setBeforeRender(ordersCheckout.length);
      return ordersCheck;
    }
    if (totalQuantity !== 0 && beforeRender === 0) {
      return setOrdersCheckout([
        ...ordersCheckout,
      ]);
    }
    setOrdersCheckout([]);
    setOrdersCheckout((curr) => ([
      ...curr,
      ...organizationOrders,
    ]));
  }, []);

  // Lógica que atualiza o preço geral quando remove um item com o botão
  useEffect(() => setTotalPrice(ordersCheckout.map((order) => order.subTotal)
    .reduce((acc, curr) => acc + curr, 0).toFixed(2).toString()
    .replace(/\./, ',')), [ordersCheckout]);

  // Lógica que tira um item quando clica no botão
  const setRemoveItem = (i, name) => {
    indexRender = indexRender.filter((item) => item !== i);
    setOrders(orders.filter((order) => order.name !== name));
    setOrdersCheckout(ordersCheckout.filter((_order, index) => index !== i));
  };

  // Lógica que atualiza quantidade geral de produtos quando remove um item com o botão
  useEffect(() => setTotalQuantity(orders.length), [ordersCheckout]);

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
          { ordersCheckout.map((order, i) => (
            <tr key={ order.item }>
              <td
                data-testid={ `customer_checkout__element-order-table-item-number-${i}` }

              >
                {order.item}

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-name-${i}` }

              >
                {order.descricao}

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                {order.quantidade}

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }

              >
                {order.valor.toFixed(2).toString().replace(/\./, ',')}

              </td>
              <td
                data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
              >
                {order.subTotal.toFixed(2).toString().replace(/\./, ',')}
              </td>
              <td>

                <button
                  data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                  type="button"
                  onClick={ () => setRemoveItem(i, order.descricao) }
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
