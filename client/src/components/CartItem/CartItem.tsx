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
import UpdateButton from '../Buttons/UpdateButton';
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
    xs={12} sm={4} md={3} lg={2}
    >
      <Card style={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}>
        <CardMedia
        component="img"
        image={cartProduct.url_image}
        alt="Product Image"
        style={{
          height: "50%",
          overflow: "hidden"
        }}
        />
        <Divider sx={{mt: 2}} variant="middle" />
        <CardContent style={{ padding: 10 }}>
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
          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton
            aria-label="Add Item"
            size='small'
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
            <UpdateButton
            text="Update Quantity"
            handleOnClick={handleEditItem}
            />
          </Stack>
          <Divider sx={{mt: 2}} variant="middle" />
          <Stack direction={"row"} justifyContent="center">
            <DeleteButton
            handleOnClick={handleRemoveItem}
            text="Delete Item"
            />
          </Stack>
        </CardContent>
      </Card>
    </Grid>
  )
}
