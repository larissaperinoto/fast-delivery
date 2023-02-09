import { Typography, Container } from '@mui/material';
import React, { useContext } from 'react';
import Context from '../context/Context';

export default function ErrorMessage() {
  const { errorMessage } = useContext(Context);
  return (
    <Container>
      { errorMessage && <Typography>{ errorMessage }</Typography> }
    </Container>
  );
}
