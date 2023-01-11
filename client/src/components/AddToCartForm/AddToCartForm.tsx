import React from 'react';

// Import Elements and Components
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import AddToCartButton from '../Buttons/AddToCartButton';

// Import helper functions
import {
  checkCartItem,
  getCartQuantity,
  checkIsInvalidQuantity
} from '../../helpers/helpers';

// Redux imports
import {
  useDispatch,
  useSelector
} from 'react-redux';

// Redux: Dispatch Types
import { AppDispatch } from '../../store/store';

// Import Async Thunks and Selectors
import {
  createCartItem,
  selectCartProducts,
  editCartItem,
} from '../../store/cartSlice/cartSlice';

interface Props {
  quantity: number,
  productId: number
}

export default function AddToCartForm({ quantity, productId }: Props) {
  const [productQuantity, setProductQuantity] = React.useState('');

  const dispatch = useDispatch<AppDispatch>();

  // Checks whether the product is in cart or not
  const cartProducts = useSelector(selectCartProducts);
  const isInCart = checkCartItem(cartProducts, productId);

  // Calculates the remaining stock
  const cartItems = isInCart ? getCartQuantity(cartProducts, productId) : 0;
  const remainingStock = quantity - cartItems;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Restrict input to only numbers
    const onlyNums = event.target.value.replace(/[^0-9]/g, '');
    setProductQuantity(onlyNums);
  };

  const handleAddToCart = async (event: React.FormEvent) => {
    event.preventDefault();

    const newQuantity = isInCart ? parseInt(productQuantity) + cartItems : parseInt(productQuantity)

    // Checks whether the new quantity is valid (less or equal than stock, etc)
    if (
      checkIsInvalidQuantity(parseInt(productQuantity), quantity) ||
      checkIsInvalidQuantity(newQuantity, quantity) ||
      productQuantity === ''
      ) {
      setProductQuantity('')
      return alert("Invalid Quantity")
    }

    // If product is not in cart, createCartItem action is dispatched
    if (!isInCart) {
      await dispatch(createCartItem({
        productId: productId,
        quantity: newQuantity
      }));
      return setProductQuantity('');
    }

    // If product is in cart, we edit the cart item
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
