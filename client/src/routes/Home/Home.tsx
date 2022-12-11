import React, {useEffect} from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Grid from '@mui/material/Grid';
import CircularIndeterminate from '../../components/LoadingIcon/CircularIndeterminate';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { loadProducts, selectProducts, selectIsLoadingProducts } from '../../store/productSlice/productSlice';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingProducts = useSelector(selectIsLoadingProducts);
  const products = useSelector(selectProducts);

  useEffect(() => {
    async function getProducts() {
      await dispatch(loadProducts());
    }

    getProducts();
  }, [dispatch]);


  return (
    <>
      {
        isLoadingProducts ?
          <CircularIndeterminate />
        :
          <Grid
          container
          direction={"row"}
          justifyContent="center"
          padding={2}
          >
            <Grid item xs={12} sm={11} md={10} lg={9} xl={8} xxl={7} xxxl={6} xxxxl={5} xxxxxl={4} xxxxxxl={3}>
              <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="stretch"
              spacing={2}
              >
                {products.map(product => {
                  return <ProductCard {...product} key={product.id} />
                })}
              </Grid>
            </Grid>
          </Grid>
      }
    </>
  );
};
