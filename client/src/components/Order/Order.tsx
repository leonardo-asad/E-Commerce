import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Box } from '@mui/material';

import * as Types from '../../types/types';

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
        width: "100%"
      }}>
        <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems:"center",
          width: "30%",
          height: "auto",
          padding: "5px"
        }}
        >
          <CardMedia
          component="img"
          image={order.url_image}
          alt="Product Image"
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