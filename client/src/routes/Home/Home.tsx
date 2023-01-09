import React, { useEffect} from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import Grid from '@mui/material/Grid';
import { Box } from '@mui/material';
import CircularIndeterminate from '../../components/LoadingIcon/CircularIndeterminate';
import Footer from '../../components/Footer/Footer';
import Success from '../../components/Messages/Success';
import CategoryCarousel from '../../components/Carousel/Carousel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/store';
import {
  loadProducts,
  selectProducts,
  selectIsLoadingProducts,
  selectLastPage,
} from '../../store/productSlice/productSlice';
import {
  loadCategories,
  selectIsLoadingCategories
} from '../../store/categorySlice/categorySlice';
import Pagination from '@mui/material/Pagination';
import { useSearchParams } from "react-router-dom";
import Typography from '@mui/material/Typography';

import './Home.css'

export default function Home() {
  // Query Params Define Page number and Category name
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get('category') || undefined;
  const pageQuery = searchParams.get('page');
  const page = pageQuery ? parseInt(pageQuery) : undefined;

  // Load state
  const dispatch = useDispatch<AppDispatch>();
  const lastPage = useSelector(selectLastPage);
  const isLoadingProducts = useSelector(selectIsLoadingProducts);
  const isLoadingCategories = useSelector(selectIsLoadingCategories);
  const products = useSelector(selectProducts);

  // Messages to User are stored in the Browser's history object
  const message = window.history.state ? (window.history.state.usr ? window.history.state.usr.message : null) : null;

  useEffect(() => {
    async function getProducts(page?: number, category?: string) {
      const params = {page, category};
      await dispatch(loadProducts(params));
    }

    // Load products every time page or category changes
    getProducts(page, category);
  }, [dispatch, page, category]);

  useEffect(() => {
    async function loadCategory() {
      await dispatch(loadCategories());
    }

    // Load Categories
    loadCategory()
  }, [dispatch])

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // Handle changing page
    category ? setSearchParams({category, page: value.toString()}) : setSearchParams({page: value.toString()})
    window.history.replaceState({}, '');
  };

  return (
    <div className="flex-wrapper">
      <Box>
        {
          isLoadingCategories ?
          <CircularIndeterminate />
          :
          <CategoryCarousel />
        }
        <>
          {
            isLoadingProducts ?
              <CircularIndeterminate />
            :
            <>
              {
                products.length > 0 &&
                <>
                  <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  >
                    <Typography
                    sx={{
                      width: "1200px",
                      marginTop: 2,
                      marginLeft: 2,
                      fontFamily: 'Proxima Nova',
                      fontSize: '20px',
                      color: '#666'
                    }}
                    >
                      Products
                    </Typography>
                  </Box>
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
                </>
              }
            </>
          }
        </>
      </Box>
      { message && <Success text={message} /> }
      <Footer />
    </div>
  );
};
