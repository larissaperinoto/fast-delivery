import {
  Container,
  TableHead,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Typography,
  TextField,
  Stack,
  MenuItem,
  Select } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Context from '../context/Context';
import { getAllSellers, postNewSale } from '../services/requests';

export default function Checkout() {
  const { orders, setOrders, totalPrice, setTotalPrice, ordersCheckout,
    setOrdersCheckout, setTotalQuantity, totalQuantity, beforeRender,
    setBeforeRender, setReturnPostNewSale } = useContext(Context);

  const [sellers, setSellers] = useState([]);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [seller, setSeller] = useState('2');
  const history = useNavigate();

  useEffect(() => {
    const requestSellers = async () => {
      const sellersList = await getAllSellers();
      setSellers(sellersList);
    };
    requestSellers();
  });

  const registerSale = async () => {
    const products = ordersCheckout.map(({ productId, quantidade }) => {
      const result = { productId, quantity: quantidade };
      return result;
    });
    const formatPrice = totalPrice.replace(',', '.');
    const sale = await postNewSale({
      seller, deliveryAddress, deliveryNumber, totalPrice: formatPrice, products });
    setReturnPostNewSale((curr) => [...curr, sale]);
    history(`/customer/orders/${sale.id}`);
  };

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
    productId: item[0].id,
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
    <Container maxWidth="md" sx={ { mt: 5 } }>
      <Navbar />
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Item</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Quantidade</TableCell>
            <TableCell>Valor unitário</TableCell>
            <TableCell>Sub-total</TableCell>
            <TableCell>Remover item</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { ordersCheckout.map((order, i) => (
            <TableRow
              key={ order.item }
              data-testid={ `customer_checkout__element-order-table-item-number-${i}` }
            >
              <TableCell
                data-testid={ `customer_checkout
                  __element-order-table-item-number-${i}` }

              >
                {order.item}

              </TableCell>
              <TableCell
                data-testid={ `customer_checkout__element-order-table-name-${i}` }

              >
                {order.descricao}

              </TableCell>
              <TableCell
                data-testid={ `customer_checkout__element-order-table-quantity-${i}` }
              >
                {order.quantidade}

              </TableCell>
              <TableCell
                data-testid={ `customer_checkout__element-order-table-unit-price-${i}` }

              >
                {order.valor.toFixed(2).toString().replace(/\./, ',')}

              </TableCell>
              <TableCell
                data-testid={ `customer_checkout__element-order-table-sub-total-${i}` }
              >
                {order.subTotal.toFixed(2).toString().replace(/\./, ',')}
              </TableCell>
              <TableCell>

                <Button
                  data-testid={ `customer_checkout__element-order-table-remove-${i}` }
                  type="button"
                  onClick={ () => setRemoveItem(i, order.descricao) }
                >
                  Remover item
                </Button>
              </TableCell>
            </TableRow>
          ))}

        </TableBody>
      </Table>
      <Typography
        data-testid="customer_checkout__element-order-total-price"
        variant="h5"
        sx={ { mt: 5, mb: 2 } }
      >
        {`R$ ${totalPrice}`}
      </Typography>

      <Typography
        variant="h5"
        sx={ { mt: 5, mb: 2 } }
      >
        Detalhes e endereço para entrega
      </Typography>
      <Stack direction="row" spacing={ 2 } alignItems="center">
        <Select
          data-testid="customer_checkout__select-seller"
          onChange={ (e) => setSeller(e.target.value) }
          value={ seller }
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Selecione o vendedor"
          size="small"
        >
          { sellers.map(({ name, id }) => (
            <MenuItem key={ id } value={ id }>
              { name }
            </MenuItem>))}
        </Select>
        <TextField
          type="text"
          placeholder="Endereço"
          size="small"
          data-testid="customer_checkout__input-address"
          value={ deliveryAddress }
          onChange={ (e) => setDeliveryAddress(e.target.value) }
        />
        <TextField
          type="text"
          placeholder="Número"
          size="small"
          data-testid="customer_checkout__input-address-number"
          value={ deliveryNumber }
          onChange={ (e) => setDeliveryNumber(e.target.value) }
        />
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          data-testid="customer_checkout__button-submit-order"
          onClick={ () => registerSale() }
        >
          Finalizar Pedido

        </Button>
      </Stack>
    </Container>
  );
}