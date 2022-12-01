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
      <Grid
      container
      direction="column"
      >
        <Grid
        container
        direction="row"
        alignItems="center"
        >
          <Grid item xs>
            <TextField
            id="quantity"
            label="Quantity"
            variant="outlined"
            size="small"
            value={name}
            onChange={handleChange}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle1" sx={{ ml: 1 }}>{quantity} available</Typography>
          </Grid>
        </Grid>
        <PrimaryButton text="Add to cart" />

      </Grid>
    </Box>
  )
}
