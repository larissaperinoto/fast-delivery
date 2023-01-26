import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Context';

export default function Provider({ children }) {
  const [orders, setOrders] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // eslint-disable-next-line react/jsx-no-constructed-context-values
  const value = {
    orders,
    setOrders,
    totalQuantity,
    setTotalQuantity,
    totalPrice,
    setTotalPrice,
  };

  return (
    <MyContext.Provider
      value={ value }
    >
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
