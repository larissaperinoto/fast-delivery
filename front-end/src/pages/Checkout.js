import {
  Container,
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
import { TableHeadOrderDetails, Navbar } from '../components';
import Context from '../context/Context';
import { methodGet, methodPost } from '../services/requests';

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
      const sellersList = await methodGet('/users/seller');
      setSellers(sellersList);
    };
    requestSellers();
  }, []);

  const registerSale = async () => {
    const products = ordersCheckout.map(({ productId, quantidade }) => {
      const result = { productId, quantity: quantidade };
      return result;
    });
    const sale = await methodPost({
      seller,
      deliveryAddress,
      deliveryNumber,
      totalPrice: totalPrice.replace(',', '.'),
      products }, '/sales');
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
      <Stack sx={ { mt: 3, mb: 5, overflowX: 'auto', maxWidth: '100%' } }>
        <Table>
          <TableHeadOrderDetails />
          <TableBody>
            { ordersCheckout.map((order, i) => (
              <TableRow
                key={ order.item }
              >
                <TableCell>{order.item}</TableCell>
                <TableCell>{order.descricao}</TableCell>
                <TableCell>{order.quantidade}</TableCell>
                <TableCell>{order.valor.toFixed(2).toString()}</TableCell>
                <TableCell>
                  {order.subTotal.toFixed(2).toString().replace('.', ',')}
                </TableCell>
                <TableCell>
                  <Button
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
      </Stack>
      <Typography
        variant="h5"
        sx={ { mt: 5, mb: 2 } }
      >
        {`R$ ${totalPrice}`}
      </Typography>

      <Container>
        <Stack
          direction="column"
          spacing={ 2 }
          sx={ { mt: 5, mb: 5 } }
        >
          <Typography variant="h5">
            Detalhes para entrega
          </Typography>
          <Select
            onChange={ ({ target: { value } }) => setSeller(value) }
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
            value={ deliveryAddress }
            onChange={ ({ target: { value } }) => setDeliveryAddress(value) }
          />
          <TextField
            type="text"
            placeholder="Número"
            size="small"
            value={ deliveryNumber }
            onChange={ ({ target: { value } }) => setDeliveryNumber(value) }
          />
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            onClick={ () => registerSale() }
          >
            Finalizar Pedido
          </Button>
        </Stack>
      </Container>
    </Container>
  );
}
