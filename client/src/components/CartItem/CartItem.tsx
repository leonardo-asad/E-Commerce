import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteButton from '../Buttons/DeleteButton';
import PrimaryButton from '../Buttons/PrimaryButton';
import Divider from '@mui/material/Divider';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { editCartItem, removeCartItem } from '../../store/cartSlice/cartSlice';

import * as Types from '../../types/types';

export default function CartItem(cartProduct: Types.CartProduct) {
  const [updatedQuantity, setUpdatedQuantity] = useState(cartProduct.quantity_order);
  const dispatch = useDispatch<AppDispatch>();

  const handleEditItem = async () => {
    await dispatch(editCartItem({
      productId: cartProduct.product_id,
      requestBody: {quantity: updatedQuantity}
    }));
  }

  const handleRemoveItem = async () => {
    await dispatch(removeCartItem(cartProduct.product_id));
  }

  return (
    <Grid
    item
    xs={12} sm={6} md={4} lg={3}
    component={Card}
    sx={{ boxShadow: 0, height: 'auto' }}
    >
      <CardMedia
      component="img"
      image={cartProduct.url_image}
      alt="Product Image"
      height="50%"
      />
      <Divider sx={{mt: 2}} variant="middle" />
      <CardContent>
        <Typography
        className="ProductName"
        variant="h6"
        component={Link}
        to={`/product/${cartProduct.product_id}`}
        >
          {cartProduct.name}
        </Typography>
        <Typography>
          Quantity Order: {updatedQuantity}
        </Typography>
        <Typography>
          In Stock: {cartProduct.in_stock}
        </Typography>
        <Stack direction="row" spacing={1}>
          <IconButton
          aria-label="Add Item"
          onClick={() => setUpdatedQuantity(updatedQuantity + 1)}
          >
            <AddCircleIcon />
          </IconButton>
          <IconButton
          aria-label="Remove Item"
          onClick={() => setUpdatedQuantity(updatedQuantity - 1)}
          >
            <RemoveCircleIcon />
          </IconButton>
          <PrimaryButton
          text="Update Quantity"
          handleOnClick={handleEditItem}
          />
        </Stack>
        <Divider sx={{mt: 2}} variant="middle" />
        <DeleteButton
        handleOnClick={handleRemoveItem}
        text="Delete Item"
        />
      </CardContent>
    </Grid>
  )
}
