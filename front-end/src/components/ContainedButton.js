import { Button } from '@mui/material';
import { string, Function, bool } from 'prop-types';
import React from 'react';

export default function containedButton({ text, handleClick, disabled }) {
  return (
    <Button
      type="button"
      variant="contained"
      color="secondary"
      size="small"
      disabled={ disabled }
      onClick={ () => handleClick() }
    >
      { text }
    </Button>
  );
}

containedButton.propTypes = {
  text: string,
  handleClick: Function,
  disabled: bool,
}.isRequired;
