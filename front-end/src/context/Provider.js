import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [orders, setOrders] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [beforeRender, setBeforeRender] = useState(0);
  const [ordersCheckout, setOrdersCheckout] = useState([]);
  const [returnPostNewSale, setReturnPostNewSale] = useState([]);
  const [disabledButton, setDisableButon] = useState('Pendente');

  const ONE_NEGATIVE = -1;
  // Esta variável determina quais itens vão renderizar
  let indexRender = ordersCheckout && ordersCheckout.map((_item, i) => ordersCheckout
    .findIndex((order) => (i + 1) === order.item)).filter((n) => n > ONE_NEGATIVE);

  const setRemoveItem = (i, name) => {
    indexRender = indexRender.filter((item) => item !== i);
    setOrders(orders.filter((order) => order.name !== name));
    setOrdersCheckout(ordersCheckout.filter((_order, index) => index !== i));
  };

  const value = React.useMemo(() => ({
    orders,
    setOrders,
    totalQuantity,
    setTotalQuantity,
    totalPrice,
    setTotalPrice,
    ordersCheckout,
    setOrdersCheckout,
    beforeRender,
    setBeforeRender,
    setRemoveItem,
    returnPostNewSale,
    setReturnPostNewSale,
    disabledButton,
    setDisableButon,
  }), [
    orders,
    setOrders,
    totalQuantity,
    setTotalQuantity,
    totalPrice,
    setTotalPrice,
    ordersCheckout,
    setOrdersCheckout,
    beforeRender,
    setBeforeRender,
    setRemoveItem,
    returnPostNewSale,
    setReturnPostNewSale,
    disabledButton,
    setDisableButon,
  ]);

  return (
    <Context.Provider
      value={ value }
    >
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
