import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AddToCartButton from '../Buttons/AddToCartButton';
import { checkCartItem, getCartQuantity, checkIsInvalidQuantity } from '../../helpers/helpers';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  createCartItem,
  selectCartProducts,
  editCartItem,
} from '../../store/cartSlice/cartSlice';

import './AddToCartForm.css'

interface Props {
  quantity: number,
  productId: number
}

export default function AddToCartForm({ quantity, productId }: Props) {
  const [productQuantity, setProductQuantity] = React.useState('');

  const dispatch = useDispatch<AppDispatch>();
  const cartProducts = useSelector(selectCartProducts);
  const isInCart = checkCartItem(cartProducts, productId);
  const cartItems = isInCart ? getCartQuantity(cartProducts, productId) : 0;
  const remainingStock = isInCart ? quantity - cartItems : quantity;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    setProductQuantity(onlyNums);
  };

  const handleAddToCart = async (event: React.FormEvent) => {
    event.preventDefault();

    const newQuantity = isInCart ? parseInt(productQuantity) + cartItems : parseInt(productQuantity)

    if (
      checkIsInvalidQuantity(parseInt(productQuantity), quantity) ||
      checkIsInvalidQuantity(newQuantity, quantity) ||
      productQuantity === ''
      ) {
      setProductQuantity('')
      return alert("Invalid Quantity")
    }

    if (!isInCart) {
      await dispatch(createCartItem({
        productId: productId,
        quantity: newQuantity
      }));
      return setProductQuantity('');
    }

    await dispatch(editCartItem({
      productId: productId,
      requestBody: {quantity: newQuantity}
    }));
    return setProductQuantity('');
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
        <TextField
        id="quantity"
        label="Quantity"
        variant="outlined"
        size="small"
        value={productQuantity}
        onChange={handleChange}
        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
        />

        <Typography variant="subtitle1">{remainingStock} available</Typography>
        {
          parseInt(productQuantity) > remainingStock &&
          <Typography variant="subtitle1" sx={{ color: "red" }}>Not enough stock. Reduce Quantity.</Typography>
        }
      </Stack>
      <Stack
      direction={"row"}
      alignItems="center"
      justifyContent={"center"}
      >
        <AddToCartButton
        text="Add to Cart"
        />
      </Stack>
    </Box>
  )
}
