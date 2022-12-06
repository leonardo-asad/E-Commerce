import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import CartItem from '../../components/CartItem/CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { loadCartProducts, selectCartProducts } from '../../store/cartSlice/cartSlice';
import { AppDispatch } from '../../store/store';

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const cartProducts = useSelector(selectCartProducts);

  useEffect(() => {
    async function loadProducts() {
      await dispatch(loadCartProducts());
    };

    loadProducts();
  }, [dispatch]);


  return (
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
  )
}
