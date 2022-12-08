import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CartItem from '../../components/CartItem/CartItem';
import Success from '../../components/Messages/Success';
import Error from '../../components/Messages/Error';
import { useDispatch, useSelector } from 'react-redux';
import { loadCartProducts, selectCartProducts, cleanMessages, selectErrorMessage, selectSuccessMessage } from '../../store/cartSlice/cartSlice';
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
  }, [dispatch]);

  useEffect(() => {
    dispatch(cleanMessages());
  }, [dispatch]);

  return (
    <>
      <Grid
      container
      direction="row"
      alignItems="stretch"
      >
        {
          cartProducts.map(cartProduct => {
            return <CartItem {...cartProduct} key={cartProduct.id} />
          })
        }
      </Grid>
      { error && <Error text={error} /> }
      { successMessage && <Success text={successMessage} /> }
    </>
  )
}
