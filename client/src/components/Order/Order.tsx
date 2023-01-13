// Import React library
import * as React from 'react';

// Import Components
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

// Import Types and Style sheet
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
        <div className='order-image'>
          <img src={order.url_image} alt={order.name} className='contain' />
        </div>
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
