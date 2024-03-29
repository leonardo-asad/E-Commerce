// Import React Library
import React from 'react';

// Import Components
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import CustomButton from '../Buttons/CustomButton';
import Divider from '@mui/material/Divider';
import UpdateQuantity from '../UpdateQuantityForm/UpdateQuantityForm';

// Import React Router
import { Link } from 'react-router-dom';

// Redux Imports
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { removeCartItem } from '../../store/cartSlice/cartSlice';

// Import Types and Style sheets
import * as Types from '../../types/types';
import './CartItem.css'

export default function CartItem(cartProduct: Types.CartProduct) {
  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveItem = async () => {
    await dispatch(removeCartItem(cartProduct.product_id));
  }

  return (
    <Grid item xs>
      <Card style={{
        display: "flex",
        flexDirection: "column",
        height: "250px"
      }}>
        <Card sx={{
          display: "flex",
          flexDirection: "row",
          height: "100%",
          boxShadow: 0
        }}>
          <div className='cart-image'>
            <img src={cartProduct.url_image} alt={cartProduct.name} className='contain' />
          </div>
          <Divider sx={{my: 5}} variant="middle" />
          <CardContent
          style={{
            padding: 10,
            width: "100%"
          }}
          >
            <Typography
            id="cart-name"
            component={Link}
            to={`/product/${cartProduct.product_id}`}
            >
              {cartProduct.name}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <UpdateQuantity
            cartItem={cartProduct}
            showPrice={true}
            />

          </CardContent>
        </Card>
        <Divider sx={{my: 1}} variant="middle" />
        <Stack direction={"row"} justifyContent="center">
          <CustomButton
          handleOnClick={handleRemoveItem}
          className="button delete-button"
          variant="outlined"
          >
            Delete Item
          </CustomButton>
        </Stack>
      </Card>
    </Grid>
  )
}
