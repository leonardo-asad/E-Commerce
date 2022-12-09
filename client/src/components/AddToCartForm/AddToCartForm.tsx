import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../store/userSlice/userSlice';
import { AppDispatch } from '../../store/store';
import { createCartItem } from '../../store/cartSlice/cartSlice';

import './AddToCartForm.css'

interface Props {
  quantity: number,
  productId: number
}

export default function AddToCartForm({ quantity, productId }: Props) {
  const dispatch = useDispatch<AppDispatch>();
  const [productQuantity, setProductQuantity] = React.useState('');
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isInvalidQuantity = (parseInt(productQuantity )< 1) || (parseInt(productQuantity) > quantity) || productQuantity === ''

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = event.target.value.replace(/[^1-9]/g, '');
    setProductQuantity(onlyNums);
  };

  const handleAddToCart = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!isLoggedIn) {
      setProductQuantity('')
      return alert("Unauthenticated. Please Login first.")
    }

    if (isInvalidQuantity) {
      setProductQuantity('')
      return alert("Invalid Quantity")
    }

    const response = await dispatch(createCartItem({
      productId: productId,
      quantity: parseInt(productQuantity)
    }));
    if (
      response.type === '/cart/createCartItem/fulfilled'
      ||
      response.type === '/cart/createCartItem/rejected'
      ) {
        setProductQuantity('');
    }
  };

  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      sx={{ mt: 2, width: '100%' }}
      onSubmit={handleAddToCart}
    >
      <Stack
      direction="row"
      alignItems="center"
      justifyContent="center"
      spacing={2}
      >
        <IconButton
        aria-label='Add to Cart'
        type='submit'
        >
          <AddShoppingCartIcon />
        </IconButton>


        <TextField
        id="quantity"
        label="Quantity"
        variant="outlined"
        size="small"
        value={productQuantity}
        onChange={handleChange}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />

        <Typography variant="subtitle1">{quantity} available</Typography>
        {
          parseInt(productQuantity) > quantity &&
          <Typography variant="subtitle1" sx={{ color: "red" }}>Not enough stock. Reduce Quantity.</Typography>
        }
      </Stack>
    </Box>
  )
}
