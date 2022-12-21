import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';

import * as Types from '../../types/types';
import './Order.css'

interface Props {
  order: Types.Order
};

export default function Order({order}: Props) {
  const date = new Date(Date.parse(order.date)).toDateString();

  return (
    <Grid
    item xs
    >
      <Card style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "250px"
      }}>
        <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems:"center",
          width: "30%",
          height: "auto",
          paddingInline: "25px"
        }}
        >
          <CardMedia
          component="img"
          image={order.url_image}
          alt="Product Image"
          sx={{
            maxHeight: "100%",
            maxWidth: "100%"
          }}
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
          <Typography className="secondary">
            Quantity: {order.quantity}
          </Typography>
          <Typography className="secondary">
            Price: {order.price} NZD
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
