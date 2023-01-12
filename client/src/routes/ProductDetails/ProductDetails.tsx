// Import React
import React, { useEffect } from 'react';

// React Router
import { useParams } from 'react-router-dom';

// Import Components
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import NotFound from '../NotFound/NotFound';
import Divider from '@mui/material/Divider';
import CircularIndeterminate from '../../components/LoadingIcon/CircularIndeterminate';
import CustomAlert from '../../components/Messages/CustomAlert';
import AddToCartForm from '../../components/AddToCartForm/AddToCartForm';
import CardContent from '@mui/material/CardContent';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  selectSelectedProduct,
  selectIsLoadingProduct,
  loadProductById
} from '../../store/productSlice/productSlice';
import {
  selectSuccessMessage,
  selectErrorMessage,
  cleanMessages
} from '../../store/cartSlice/cartSlice';
import { selectIsLoggedIn } from '../../store/userSlice/userSlice';
import { AppDispatch } from '../../store/store';

// Import Syle Sheet
import './ProductDetails.css'

export default function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const selectedProduct = useSelector(selectSelectedProduct);
  const isLoadingProduct = useSelector(selectIsLoadingProduct);
  const successMessage = useSelector(selectSuccessMessage);
  const errorMessage = useSelector(selectErrorMessage);
  const isLoggedIn = useSelector(selectIsLoggedIn);

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
          <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems:"center",
            height: "400px",
            padding: "10px",
          }}
          >
            <CardMedia
            component="img"
            image={selectedProduct.url_image}
            alt="Product Image"
            sx={{
              maxHeight: "100%",
              maxWidth: "100%"
            }}
            />
          </Box>
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
            {
              isLoggedIn &&
              <>
                <Divider sx={{mt:2}} />
                <AddToCartForm
                quantity={selectedProduct.quantity}
                productId={selectedProduct.id}
                />
              </>
            }

          </CardContent>
          </Card>
      </Box>
      { successMessage && <CustomAlert severity='success'>{successMessage}</CustomAlert> }
      { errorMessage && <CustomAlert severity='error'>{errorMessage}</CustomAlert> }
    </>
  )
}
