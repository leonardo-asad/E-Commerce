// Import React
import React, { useEffect } from 'react';

// Import Components
import Grid from '@mui/material/Grid';
import Order from '../../components/Order/Order';
import CircularIndeterminate from '../../components/LoadingIcon/CircularIndeterminate';

// Redux Imports
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
        <div className='center home'>
          <Grid
          container
          direction={"column"}
          spacing={2}
          sx={{
            width:"100%"
          }}
          >
            {
              orders.map(order => {
                return <Order order={order} key={order.order_id} />
              })
            }
          </Grid>
        </div>
      }
    </>
  )
}
