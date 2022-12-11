import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Link } from 'react-router-dom';
import { Box } from '@mui/material';

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
      <Card
      className="product-card"
      component={Link}
      to={`/product/${id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
      >
        <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems:"center",
          height: "70%",
          padding: "5px"
        }}
        >
          <CardMedia
          component="img"
          image={url_image}
          alt="Product Image"
          />
        </Box>
        <Divider sx={{ my: "5%" }} />
        <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "15%"
        }}
        >
          <Typography
          className="product-name"
          >
            {name}
          </Typography>
          <Typography
          className="price"
          >
            {price} NZD
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
