import React, {useState, useEffect} from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import CircularIndeterminate from '../../components/LoadingIcon/CircularIndeterminate';
import Footer from '../../components/Footer/Footer';
import Success from '../../components/Messages/Success';
import CategoriesStack from '../../components/CategoriesStack/CategoriesStack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  loadProducts,
  selectProducts,
  selectIsLoadingProducts,
  selectLastPage,
} from '../../store/productSlice/productSlice';
import Pagination from '@mui/material/Pagination';

import './Home.css'

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const [page, setPage] = useState(1)
  const lastPage = useSelector(selectLastPage);
  const isLoadingProducts = useSelector(selectIsLoadingProducts);
  const products = useSelector(selectProducts);
  let message = window.history.state.usr ? window.history.state.usr.message : null;


  useEffect(() => {
    async function getProducts() {
      await dispatch(loadProducts(page));
    }

    getProducts();
  }, [dispatch, page]);

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.history.replaceState({}, '');
  };

  return (
    <>
      {
        isLoadingProducts ?
          <CircularIndeterminate />
        :
        <div className="flex-wrapper">

          <Box>
            <CategoriesStack />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
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
              <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
              >
                <Pagination
                variant='outlined'
                count={lastPage}
                page={page}
                onChange={handleChange}
                sx={{
                  marginY: 2
                }}
                />
              </Box>
          </Box>
          { message && <Success text={message} /> }
          <Footer />
        </div>
      }
    </>
  );
};
