import React from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Stack } from '@mui/material';
import { editCartItem } from '../../store/cartSlice/cartSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

import * as Types from '../../types/types';
import './UpdateQuantityForm.css'

interface Props {
  cartItem: Types.CartProduct
}

export default function UpdateQuantity({ cartItem }: Props) {
  const dispatch = useDispatch<AppDispatch>();

  const isInvalidQuantity = (updatedQuantity: number) => {
    return (updatedQuantity > cartItem.in_stock) || (updatedQuantity <= 0);
  }

  const handleAddItem = async () => {
    if (isInvalidQuantity(cartItem.quantity_order+1)) {
      return alert("Invalid Quantity");
    }

    await dispatch(editCartItem({
      productId: cartItem.product_id,
      requestBody: {quantity: cartItem.quantity_order+1}
    }));
  };

  const handleRemoveItem = async () => {
    if (isInvalidQuantity(cartItem.quantity_order-1)) {
      return alert("Invalid Quantity");
    }

    await dispatch(editCartItem({
      productId: cartItem.product_id,
      requestBody: {quantity: cartItem.quantity_order-1}
    }));
  };

  return (
    <Stack
    direction={"column"}
    justifyContent="center"
    alignItems={"center"}
    spacing={1}
    marginY={1}
    sx={{ width: "150px" }}
    >
      <TextField
      value={cartItem.quantity_order}
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <IconButton onClick={handleRemoveItem}>
              <RemoveIcon />
            </IconButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position='end'>
            <IconButton onClick={handleAddItem}>
              <AddIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
      fullWidth
      inputProps={{ style: {
        textAlign: "center",
        maxHeight: "10px"
      }}}
      />
      <Typography className='item-qty'>
        Available {cartItem.in_stock}
      </Typography>
    </Stack>
  )
}
