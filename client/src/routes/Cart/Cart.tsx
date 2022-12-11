import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import CartItem from '../../components/CartItem/CartItem';
import Success from '../../components/Messages/Success';
import Error from '../../components/Messages/Error';
import BottomBar from '../../components/BottomBar/BottomBar';
import { useDispatch, useSelector } from 'react-redux';
import {
  loadCartProducts,
  selectCartProducts,
  cleanMessages,
  selectErrorMessage,
  selectSuccessMessage,
  submitOrder,
} from '../../store/cartSlice/cartSlice';
import { AppDispatch } from '../../store/store';

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const cartProducts = useSelector(selectCartProducts);
  const error = useSelector(selectErrorMessage);
  const successMessage = useSelector(selectSuccessMessage);

  useEffect(() => {
    async function loadProducts() {
      await dispatch(loadCartProducts());
    };

    loadProducts();
  }, [dispatch, cartProducts]);

  useEffect(() => {
    dispatch(cleanMessages());
  }, [dispatch]);

  const handleSubmitOrder = async () => {
    await dispatch(submitOrder());
  }

  return (
    <>
      <Box
      sx={{
        display:"flex",
        direction:"row",
        justifyContent:"center",
        padding:2,
        paddingBottom:20
      }}
      >

        <Grid
          container
          direction={"column"}
          spacing={2}
          sx={{maxWidth:"1000px"}}
        >
          {
            cartProducts.map(cartProduct => {
              return <CartItem {...cartProduct} key={cartProduct.id} />
            })
          }
        </Grid>

      </Box>
      { error && <Error text={error} /> }
      { successMessage && <Success text={successMessage} /> }
      <BottomBar
      cartProducts={cartProducts}
      handleSubmitOrder={handleSubmitOrder}
      />
    </>

  )
}
