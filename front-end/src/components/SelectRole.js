import React, { useContext } from 'react';
import { MenuItem, Select } from '@mui/material';
import Context from '../context/Context';

export default function SelectRole() {
  const { setRole } = useContext(Context);

  return (
    <Select
      placeholder="Tipo"
      onChange={ ({ target: { value } }) => setRole(value) }
    >
      <MenuItem value="seller" defaultValue>Vendedor</MenuItem>
      <MenuItem value="customer">Cliente</MenuItem>
    </Select>
  );
}
