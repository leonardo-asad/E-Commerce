import React, {useEffect} from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import CircularIndeterminate from '../../components/LoadingIcon/CircularIndeterminate';
import Footer from '../../components/Footer/Footer';
import Success from '../../components/Messages/Success';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import { AppDispatch } from '../../store/store';
import {
  loadProducts,
  selectProducts,
  selectIsLoadingProducts
} from '../../store/productSlice/productSlice';
import PaginationControlled from '../../components/PaginationControlled/PaginationControlled';

import './Home.css'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const isLoadingProducts = useSelector(selectIsLoadingProducts);
  const products = useSelector(selectProducts);
  const location = useLocation();
  const message = location.state ? location.state.message : null;

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
        <div className="flex-wrapper">
          <Box
          sx={{
            display: "flex",
            direction: "row",
            justifyContent: "center",
            padding: 2,
            paddingBottom: 5
          }}
          >
            <Grid
            container
            direction="row"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
            sx={{width: "1200px"}}
            >
              {products.map(product => {
                return <ProductCard {...product} key={product.id} />
              })}
            </Grid>
          </Box>
          { message && <Success text={message} /> }
          <PaginationControlled />
          <Footer />
        </div>
      }
    </>
  );
};
