import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@mui/material';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import NotFound from '../NotFound/NotFound';
import Divider from '@mui/material/Divider';
import CircularIndeterminate from '../../components/LoadingIcon/CircularIndeterminate';
import Success from '../../components/Messages/Success';
import Error from '../../components/Messages/Error';
import AddToCartForm from '../../components/AddToCartForm/AddToCartForm';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedProduct, selectIsLoadingProduct, loadProductById } from '../../store/productSlice/productSlice';
import { selectSuccessMessage, selectErrorMessage, cleanMessages } from '../../store/cartSlice/cartSlice';
import { AppDispatch } from '../../store/store';
import { CardContent } from '@mui/material';

import './ProductDetails.css'

export default function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const selectedProduct = useSelector(selectSelectedProduct);
  const isLoadingProduct = useSelector(selectIsLoadingProduct);
  const successMessage = useSelector(selectSuccessMessage);
  const errorMessage = useSelector(selectErrorMessage);

  useEffect(() => {
    async function loadProduct(id: number) {
      await dispatch(loadProductById(id));
    }

    if (productId) {
      loadProduct(parseInt(productId));
    }
  }, [dispatch, productId]);

  useEffect(() => {
    dispatch(cleanMessages());
  }, [dispatch])

  if (typeof productId === "undefined") {
    return null;
  };

  if (isLoadingProduct) {
    return <CircularIndeterminate />
  };

  if (!selectedProduct) {
    return <NotFound />
  };

  return (
    <>
      <Box
      sx={{
        display: "flex",
        direction:"row",
        justifyContent:"center",
        padding: 2,
      }}
      >
        <Card style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          maxWidth: "1000px"
        }}>
          <CardMedia
          component="img"
          image={selectedProduct.url_image}
          alt="Product Image"
          style={{
            width: "250px",
            margin: 10
          }}
          />
          <CardContent style={{
            display: "flex",
            flexDirection: "column",
          }}>
            <Typography className="product-info-title" variant="h4">
            {selectedProduct.name}
            </Typography>
            <Typography className="product-info-title" variant="h6" color="text.secondary">
              {selectedProduct.price} NZD
            </Typography>
            <Divider sx={{my:2}} />
            <Typography variant='h6'>
              Description:
            </Typography>
            <Typography variant='body1'>
              {selectedProduct.description}
            </Typography>
            <Divider sx={{mt:2}} />
            <AddToCartForm
            quantity={selectedProduct.quantity}
            productId={selectedProduct.id}
            />
          </CardContent>
          </Card>
      </Box>
      { successMessage && <Success text={successMessage} /> }
      { errorMessage && <Error text={errorMessage} /> }
    </>
  )
}
