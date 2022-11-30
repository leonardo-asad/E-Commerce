import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PrimaryButton from '../Buttons/PrimaryButton';

import './AddToCartForm.css'

export default function AddToCartForm() {
  const [name, setName] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    setName(onlyNums);
  };


  return (
    <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 2, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField
      id="quantity"
      label="Quantity"
      variant="outlined"
      size="small"
      value={name}
      onChange={handleChange}
      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
      />
      <PrimaryButton text="Add to cart" />
    </Box>
  )
}
