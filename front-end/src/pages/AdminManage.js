import React, { useContext } from 'react';
import { Typography, Container } from '@mui/material';
import { methodPost } from '../services/requests';
import Context from '../context/Context';
import RegisterForm from '../components/RegisterForm';

export default function AdminManage() {
  const { messageFromDB, setMessageFromDB } = useContext(Context);

  const registerNewSeller = async ({ name, email, password, role }) => {
    const message = await methodPost({ name, email, password, role }, '/seller');
    setMessageFromDB(message);
  };

  return (
    <Container sx={ { mt: 5 } }>
      <Typography variant="h5" sx={ { mb: 2 } }>Cadastrar novo usuário</Typography>
      <RegisterForm handleRegister={ registerNewSeller } />
      { messageFromDB && <Typography>{ messageFromDB }</Typography> }
    </Container>
  );
}
