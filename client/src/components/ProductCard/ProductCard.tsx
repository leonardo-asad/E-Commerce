import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';

import './ProductCard.css'

interface Props {
  id: number,
  name: string,
  url_image: string,
  price: string
};

export default function ProductCard({id, name, url_image, price}: Props) {

  return (
    <Grid
    item
    xs={12} sm={6} md={4} lg={3}
    component={Card}
    sx={{ boxShadow: 0, height: 'auto' }}
    >

        <CardMedia
        component="img"
        image={url_image}
        alt="Product Image"
        height='60%'
        />
        <Divider sx={{mt: 2}} variant="middle" />
        <CardContent>
          <Typography
          className="ProductName"
          variant="h6"
          component={Link}
          to={`/product/${id}`}
          >
            {name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {price}
          </Typography>
        </CardContent>
    </Grid>
  );
}
