import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
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
    xs={12} sm={4} md={3} lg={2}
    >
      <Card style={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}>
        <CardMedia
        component="img"
        image={url_image}
        alt="Product Image"
        style={{
          height: "70%",
          overflow: "hidden"
        }}
        />

        <CardContent
        style={{
          height: "30%"
        }}
        >
          <Typography
          className="ProductName"
          variant="h6"
          component={Link}
          to={`/product/${id}`}
          >
            {name}
          </Typography>
          <Typography variant="h6" className="Price">
            {price} NZD
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
