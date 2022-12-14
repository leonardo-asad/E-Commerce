import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import DeleteButton from '../Buttons/DeleteButton';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';
import UpdateQuantity from '../UpdateQuantityForm/UpdateQuantityForm';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  removeCartItem,
} from '../../store/cartSlice/cartSlice';

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
          <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems:"center",
            width: "30%",
            height: "auto",
            padding: "5px"
          }}
          >
            <CardMedia
            component="img"
            image={cartProduct.url_image}
            alt="Product Image"
            />
          </Box>
          <Divider sx={{my: 5}} variant="middle" />
          <CardContent
          style={{
            padding: 10,
            width: "100%"
          }}
          >
            <Typography
            className="cart-name"
            component={Link}
            to={`/product/${cartProduct.product_id}`}
            >
              {cartProduct.name}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <UpdateQuantity
            cartItem={cartProduct}
            />

          </CardContent>
        </Card>
        <Divider sx={{my: 1}} variant="middle" />
        <Stack direction={"row"} justifyContent="center">
          <DeleteButton
          handleOnClick={handleRemoveItem}
          text="Delete Item"
          />
        </Stack>
      </Card>
    </Grid>
  )
}
