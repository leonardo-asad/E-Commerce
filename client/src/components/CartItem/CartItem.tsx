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
import { Box } from '@mui/material';

import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { editCartItem, removeCartItem } from '../../store/cartSlice/cartSlice';

import * as Types from '../../types/types';
import './CartItem.css'

export default function CartItem(cartProduct: Types.CartProduct) {
  const [updatedQuantity, setUpdatedQuantity] = useState(cartProduct.quantity_order);
  const dispatch = useDispatch<AppDispatch>();
  const isInvalidQuantity = (updatedQuantity > cartProduct.in_stock) || (updatedQuantity <= 0);
  const quantityColor = isInvalidQuantity ? "red" : "black"

  const handleEditItem = async () => {
    if (isInvalidQuantity) {
      return alert("Not a valid quantity. Please change the value and try again.")
    }
    await dispatch(editCartItem({
      productId: cartProduct.product_id,
      requestBody: {quantity: updatedQuantity}
    }));
  }

  const handleRemoveItem = async () => {
    await dispatch(removeCartItem(cartProduct.product_id));
  }

  return (
    <Grid item xs>
      <Card style={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
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
            className="product-name"
            variant="h6"
            component={Link}
            to={`/product/${cartProduct.product_id}`}
            >
              {cartProduct.name}
            </Typography>
            <Typography variant="h6" className="price">
              {cartProduct.total_price} NZD
            </Typography>
            <Typography sx={{ color: quantityColor }}>
              Quantity Order: {updatedQuantity}
            </Typography>
            <Typography>
              In Stock: {cartProduct.in_stock}
            </Typography>
            <Grid
            container
            direction="row"
            spacing={1}
            justifyContent="left"
            flexWrap={"wrap"}
            marginTop={1}
            >
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
            </Grid>
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
