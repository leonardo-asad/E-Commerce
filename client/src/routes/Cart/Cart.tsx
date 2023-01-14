// Import React
import React, { useEffect } from 'react';

// Import React Router
import { useNavigate } from 'react-router-dom';

// Import Components
import Grid from '@mui/material/Grid';
import CartItem from '../../components/CartItem/CartItem';
import CustomAlert from '../../components/Messages/CustomAlert';
import BottomBar from '../../components/BottomBar/BottomBar';
import CircularIndeterminate from '../../components/LoadingIcon/CircularIndeterminate';

// Redux Imports
import {
  loadCartProducts,
  selectIsLoadingCartProducts,
  selectCartProducts,
  cleanMessages,
  selectErrorMessage,
  selectSuccessMessage,
  verifyStock,
} from '../../store/cartSlice/cartSlice';
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';

// Import Style sheet
import './Cart.css'

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const cartProducts = useSelector(selectCartProducts);
  const isLoadingCartProducts = useSelector(selectIsLoadingCartProducts);
  const error = useSelector(selectErrorMessage);
  const successMessage = useSelector(selectSuccessMessage);

  useEffect(() => {
    async function loadProducts() {
      await dispatch(loadCartProducts());
    };

    loadProducts();

    // Clear previous messages
    dispatch(cleanMessages());
  }, [dispatch]);

  const handleSubmitOrder = async () => {
    if (cartProducts.length === 0) {
      return alert("Invalid Request: Empty Cart");
    }

    const response = await dispatch(verifyStock());
    if (response.type === '/cart/verifyStock/fulfilled') {
      return navigate("/cart/mine/checkout")
    }
  }

  return (
    <>
      {
        isLoadingCartProducts ?
        <CircularIndeterminate />
        :
        <div className='center home cart-bottom'>
          <Grid
            container
            direction={"column"}
            spacing={2}
            sx={{width:"100%"}}
          >
            {
              cartProducts.map(cartProduct => {
                return <CartItem {...cartProduct} key={cartProduct.id} />
              })
            }
          </Grid>
        </div>
      }
      { error && <CustomAlert severity='error'>{error}</CustomAlert> }
      { successMessage && <CustomAlert severity='success'>{successMessage}</CustomAlert> }
      <BottomBar
      cartProducts={cartProducts}
      handleSubmitOrder={handleSubmitOrder}
      />
    </>
  )
}
