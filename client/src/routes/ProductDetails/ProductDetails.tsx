import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import NotFound from '../NotFound/NotFound';
import Divider from '@mui/material/Divider';
import CircularIndeterminate from '../../components/LoadingIcon/CircularIndeterminate';
import AddToCartForm from '../../components/AddToCartForm/AddToCartForm';
import { useSelector, useDispatch } from 'react-redux';
import { selectSelectedProduct, selectIsLoadingProduct, loadProductById } from '../../store/productSlice/productSlice';
import { AppDispatch } from '../../store/store';

//import { products } from '../../data/products/products';

export default function ProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const selectedProduct = useSelector(selectSelectedProduct);
  const isLoadingProduct = useSelector(selectIsLoadingProduct);

  useEffect(() => {
    async function loadProduct(id: number) {
      await dispatch(loadProductById(id));
    }

    if (productId) {
      loadProduct(parseInt(productId));
    }
  }, [dispatch, productId]);

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
    <Grid
    container
    spacing={2}
    justifyContent="center"
    >
      <Grid item xs={4}>
        <Card>
          <CardMedia
          component="img"
          image={selectedProduct.url_image}
          alt="Product Image"
          />
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6">
          {selectedProduct.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {selectedProduct.price}
        </Typography>
        <Divider />
          <AddToCartForm
          quantity={selectedProduct.quantity}
          productId={selectedProduct.id}
          />
      </Grid>
    </Grid>
  )
}
