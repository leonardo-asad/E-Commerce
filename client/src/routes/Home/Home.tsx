import React from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Grid from '@mui/material/Grid';
import { products } from '../../data/products/products';

export default function Home() {
  return (
    <Grid
    container
    direction="row"
    alignItems="stretch"
    >
      {products.map(product => {
        return <ProductCard {...product} key={product.id} />
      })}
    </Grid>
  );
};
