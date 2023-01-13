// Import React Library
import * as React from 'react';

// Import Components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

// Import React Router Component
import { Link } from 'react-router-dom';

// Import Style sheet
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
      id="product-card"
      component={Link}
      to={`/product/${id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "350px"
      }}
      >
        <div className='product-item'>
          <img src={url_image} alt={name} className='contain' />
        </div>
        <Divider/>
        <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          height: "75px"
        }}
        >
          <Typography
          id="home-price"
          >
            {price} NZD
          </Typography>
          <Typography
          id="home-name"
          >
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
