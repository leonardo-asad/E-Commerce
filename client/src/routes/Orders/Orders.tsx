import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Order from '../../components/Order/Order';
import { Box } from '@mui/material';
import CircularIndeterminate from '../../components/LoadingIcon/CircularIndeterminate';
import { useSelector, useDispatch } from 'react-redux';
import {
  loadOrders,
  selectOrders,
  selectIsLoadingOrders
} from '../../store/orderSlice/orderSlice';
import { AppDispatch } from '../../store/store';

export default function Orders() {
  const dispatch = useDispatch<AppDispatch>();
  const orders = useSelector(selectOrders);
  const isLoadingOrders = useSelector(selectIsLoadingOrders);

  useEffect(() => {
    async function load() {
      await dispatch(loadOrders());
    }

    load();
  }, [dispatch])

  return (
    <>
      {
        isLoadingOrders ?
          <CircularIndeterminate />
          :
          <Box
          sx={{
            display: "flex",
            direction:"row",
            justifyContent:"center",
            padding:2,
          }}
          >
            <Grid
            container
            direction={"column"}
            spacing={2}
            sx={{maxWidth:"1000px"}}
            >
              {
                orders.map(order => {
                  return <Order order={order} key={order.order_id} />
                })
              }
            </Grid>
          </Box>
      }
    </>
  )
}
