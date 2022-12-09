import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
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
      <Grid
      container
      direction={"row"}
      justifyContent="center"
      >
        <Grid item xs={12} md={8} lg={5}>
          <Grid
            container
            direction={"column"}
            spacing={2}
          >
            {
              cartProducts.map(cartProduct => {
                return <CartItem {...cartProduct} key={cartProduct.id} />
              })
            }
          </Grid>
        </Grid>
      </Grid>
      { error && <Error text={error} /> }
      { successMessage && <Success text={successMessage} /> }
      <BottomBar
      cartProducts={cartProducts}
      handleSubmitOrder={handleSubmitOrder}
      />
    </>

  )
}
