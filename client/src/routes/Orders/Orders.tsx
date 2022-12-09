import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Order from '../../components/Order/Order';
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
          <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          >
            <Grid item xs={12} md={8} lg={5}>
              <Grid
              container
              direction={"column"}
              spacing={2}
              >
                {
                  orders.map(order => {
                    return <Order order={order} key={order.order_id} />
                  })
                }
              </Grid>
            </Grid>
          </Grid>
      }
    </>
  )
}
