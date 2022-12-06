import React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import NotFound from '../NotFound/NotFound';
import Divider from '@mui/material/Divider';
import AddToCartForm from '../../components/AddToCartForm/AddToCartForm';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../store/productSlice/productSlice';

//import { products } from '../../data/products/products';

export default function ProductDetails() {
  const { productId } = useParams();
  const products = useSelector(selectProducts);

  if (typeof productId === "undefined") {
    return null;
  };

  const product = products.find(product => product.id === parseInt(productId));

  if (!product) {
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
          image={product.url_image}
          alt="Product Image"
          />
        </Card>
      </Grid>
      <Grid item xs={8}>
        <Typography variant="h6">
          {product.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          {product.price}
        </Typography>
        <Divider />
          <AddToCartForm
          quantity={product.quantity}
          />
      </Grid>
    </Grid>
  )
}
