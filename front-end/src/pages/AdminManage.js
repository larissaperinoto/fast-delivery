import React, { useContext } from 'react';
import { Typography, Container } from '@mui/material';
import { methodPost } from '../services/requests';
import Context from '../context/Context';
import RegisterForm from '../components/RegisterForm';
import Navbar from '../components/Navbar';
import ErrorMessage from '../components/ErrorMessage';

export default function AdminManage() {
  const { setErrorMessage } = useContext(Context);

  const registerNewSeller = async ({ name, email, password, role }) => {
    const message = await methodPost({ name, email, password, role }, '/seller');
    setErrorMessage(message);
  };

  return (
    <>
      <Navbar />
      <Container sx={ { mt: 5 } }>
        <Typography variant="h5" sx={ { mb: 2 } }>Cadastrar novo usuário</Typography>
        <RegisterForm handleRegister={ registerNewSeller } />
      </Container>
      <ErrorMessage />
    </>
  );
}
