// Import React Library
import * as React from 'react';

// Import Components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';

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
      className="product-card"
      component={Link}
      to={`/product/${id}`}
      style={{
        display: "flex",
        flexDirection: "column",
        height: "350px"
      }}
      >
        <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems:"center",
          height: "225px",
          padding: "5px",
        }}
        >
          <CardMedia
          component="img"
          image={url_image}
          alt="Product Image"
          sx={{
            maxHeight: "100%",
            maxWidth: "100%"
          }}
          />
        </Box>
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
          className="home-price"
          >
            {price} NZD
          </Typography>
          <Typography
          className="home-name"
          >
            {name}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
