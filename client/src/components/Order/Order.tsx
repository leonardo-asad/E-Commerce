import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import ImageBox from '../ImageBox/ImageBox';
import { Box } from '@mui/material';

import * as Types from '../../types/types';

interface Props {
  order: Types.Order
};

export default function Order({order}: Props) {
  const date = new Date(Date.parse(order.date)).toDateString()

  const image = (
    <CardMedia
    component="img"
    image={order.url_image}
    alt="Product Image"
    />
  );

  return (
    <Grid
    item xs
    >
      <Card style={{
        display: "flex",
        flexDirection: "row",
        height: "100%"
      }}>
        <Box
        style={{
          width: "30%",
          height: "100%"
        }}
        >
          <ImageBox
          image={image}
          />
        </Box>
        <CardContent
        style={{
          width: "70%"
        }}
        >
          <Typography>
            {date}
          </Typography>
          <Divider
          sx={{ my: 2 }}
          />
          <Typography
          variant="h6"
          >
            {order.name}
          </Typography>
          <Typography variant="h6" className="Price">
            {order.price} NZD
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
