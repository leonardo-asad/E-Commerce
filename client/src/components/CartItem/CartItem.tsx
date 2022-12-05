import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

interface Props {
  id: number,
  product_id: number,
  name: string,
  image: string,
  inStock: number,
  quantity: number,
  pricePerUnit: string,
  totalPrice: string
};

export default function CartItem(props: Props) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardMedia
        component="img"
        image={props.image}
        alt="Product Image"
        height="200"
        />
      </Card>
    </Grid>
  )
}
