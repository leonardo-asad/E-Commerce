import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

interface Props {
  id: number,
  name: string,
  image: string,
  price: string
};

export default function ProductCard({id, name, image, price}: Props) {

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardMedia
        component="img"
        image={image}
        alt="Product Image"
        height="400"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {price}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
          size="small"
          component={Link}
          to={`product/${id}`}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
}
