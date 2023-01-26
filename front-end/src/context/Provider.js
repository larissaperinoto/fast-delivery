import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [orders, setOrders] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  const value = React.useMemo(() => ({
    orders,
    setOrders,
    totalQuantity,
    setTotalQuantity,
    totalPrice,
    setTotalPrice,
  }), [
    orders,
    setOrders,
    totalQuantity,
    setTotalQuantity,
    totalPrice,
    setTotalPrice,
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
