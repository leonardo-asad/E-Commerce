// Import React
import React from 'react';

// Import Components
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

// Import Redux and Reducers
import { editCartItem } from '../../store/cartSlice/cartSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';

// Import Types and Style sheet
import * as Types from '../../types/types';
import './UpdateQuantityForm.css'

interface Props {
  cartItem: Types.CartProduct
  showPrice: boolean
}

export default function UpdateQuantity({ cartItem, showPrice }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const remainingStock = cartItem.in_stock - cartItem.quantity_order;

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
    alignItems={"flex-start"}
    spacing={0.8}
    marginY={3}
    sx={{ width: "100%" }}
    >
      <Stack
      direction={"row"}
      justifyContent="center"
      alignItems={"center"}
      spacing={3}
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
        inputProps={{ style: {
          textAlign: "center",
          maxHeight: "10px"
        }}}
        sx={{ minWidth: "150px", maxWidth: "150px" }}
        />
        {
          showPrice &&
          <Typography id='item-price'>
            {cartItem.total_price} NZD
          </Typography>
        }
      </Stack>
      <Box
      sx={{ width: "150px" }}
      >
        <Typography id='item-qty'>
          Available {remainingStock}
        </Typography>
      </Box>
    </Stack>
  )
}
