import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

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
    <Grid
    item
    xs={12} sm={6} md={4} lg={3}
    component={Card}
    sx={{ boxShadow: 0, height: 'auto' }}
    >
      <CardMedia
      component="img"
      image={props.image}
      alt="Product Image"
      height="60%"
      />
      <CardContent>
        <Typography
        className="ProductName"
        variant="h6"
        component={Link}
        to={`product/${props.product_id}`}
        >
          {props.name}
        </Typography>
      </CardContent>
    </Grid>
  )
}
