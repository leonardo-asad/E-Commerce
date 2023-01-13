// Import React Library
import React from 'react';

// Import Components
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import CustomButton from '../Buttons/CustomButton';

// Import types and Style sheet
import * as Types from '../../types/types';
import './BottomBar.css'

interface Props {
  cartProducts: Types.CartProducts,
  handleSubmitOrder: () => void
};

// Helper Functions
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
    <Paper
    sx={{
    backgroundColor: "primary.main",
    position: 'fixed',
    bottom: 0,
    width: '100%',
    borderRadius: 0,
    marginTop: 2
    }}
    elevation={24}
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
          <Typography className='big-font'>Number of items: {productsQuantity}</Typography>
          <Divider sx={{borderColor: 'white', my: '5px'}} />
          <Typography className='total-value'>Total Value: {totalValue} NZD</Typography>
        </Grid>
        <Grid item xs={4}>
          <Stack
          direction="column"
          justifyContent="center"
          >
            <CustomButton
            handleOnClick={handleSubmitOrder}
            className="button primary-button buy-button"
            variant="outlined"
            >
              Checkout
            </CustomButton>
          </Stack>
        </Grid>
      </Grid>
    </Paper>
  )
}
