import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import BuyButton from '../Buttons/BuyButton';
import * as Types from '../../types/types';
import './BottomBar.css'

interface Props {
  cartProducts: Types.CartProducts,
  handleSubmitOrder: () => void
};

const getProductsQuantity = (cartProducts:Types.CartProducts) => {
  return cartProducts.length;
};

const getTotalValue = (cartProducts: Types.CartProducts) => {
  return cartProducts.map(({ total_price }) => parseInt(total_price)).reduce((sum, i) => sum + i, 0);
};

export default function BottomBar({ cartProducts, handleSubmitOrder }: Props) {
  const productsQuantity = getProductsQuantity(cartProducts);
  const totalValue = getTotalValue(cartProducts);

  return (
    <Paper sx={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: "#C44B4F"
      }}
      elevation={3}
      >
        <Grid
        container
        sx={{ height: '100%' }}
        direction={"row"}
        justifyContent="center"
        spacing={2}
        padding={2}
        >
          <Grid item xs={4}>
            <Typography className='BigTypography'>Number of items: {productsQuantity}</Typography>
            <Divider sx={{borderColor: 'white', my: '5px'}} />
            <Typography className='LetterTotalValue'>Total Value: {totalValue} NZD</Typography>
          </Grid>

          <Grid container xs={4}>
            <Stack
            direction="column"
            justifyContent="center"
            >
              <BuyButton
              text={"Buy Products"}
              handleOnClick={handleSubmitOrder}
              />
            </Stack>
          </Grid>

        </Grid>


    </Paper>
  )
}
