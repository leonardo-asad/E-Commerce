import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import PrimaryButton from '../Buttons/PrimaryButton';
import Grid from '@mui/material/Grid';

import './AddToCartForm.css'

interface Props {
  quantity: number,
}

export default function AddToCartForm({ quantity }: Props) {
  const [productQuantity, setProductQuantity] = React.useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    setProductQuantity(onlyNums);
  };


  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ mt: 2 }}
    >

        <Grid
        container
        direction="row"
        alignItems="center"
        spacing={1}
        >
          <Grid item xs={3}>
            <TextField
            sx={{ width: '100%' }}
            id="quantity"
            label="Quantity"
            variant="outlined"
            size="small"
            value={productQuantity}
            onChange={handleChange}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="subtitle1" sx={{ ml: 1 }}>{quantity} available</Typography>
            {
              parseInt(productQuantity) > quantity &&
              <Typography variant="subtitle1" sx={{ ml: 1, color: "red" }}>Not enough stock. Reduce Quantity.</Typography>
            }
          </Grid>
        </Grid>
        <PrimaryButton text="Add to cart" />

    </Box>
  )
}
