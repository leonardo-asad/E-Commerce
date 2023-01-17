// Import React
import React, { useEffect} from 'react';

// Import Components
import ProductCard from '../../components/ProductCard/ProductCard';
import Grid from '@mui/material/Grid';
import CircularIndeterminate from '../../components/LoadingIcon/CircularIndeterminate';
import Footer from '../../components/Footer/Footer';
import CustomAlert from '../../components/Messages/CustomAlert';
import CategoryCarousel from '../../components/Carousel/Carousel';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import EmptyProductsMessage from '../../components/EmptyProducts/EmptyProducts';

// Redux Imports
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

// React Router
import { useSearchParams } from "react-router-dom";

// Style sheet
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

  // Messages to the User are stored in the Browser's history object
  const message = window.history.state ? (window.history.state.usr ? window.history.state.usr.message : null) : null;

  useEffect(() => {
    async function getProducts(page?: number, category?: string) {
      const params = {page, category};
      await dispatch(loadProducts(params));
    }

    // Load products every time the page or category changes
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
      <div>
        {
          isLoadingCategories ?
          <CircularIndeterminate />
          :
          <CategoryCarousel />
        }
        {
          isLoadingProducts ?
          <CircularIndeterminate />
          :
          <>
            {
              products.length > 0 ?
              <>
                <div className='center home'>
                  <Typography
                  sx={{
                    width: "100%",
                    fontFamily: 'Proxima Nova',
                    fontSize: '20px',
                    color: '#666'
                  }}
                  >
                    Products
                  </Typography>
                </div>
                <div className='center home'>
                  <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="stretch"
                  spacing={2}
                  sx={{width: "100%"}}
                  >
                    {products.map(product => {
                      return <ProductCard {...product} key={product.id} />
                    })}
                  </Grid>
                </div>
                <div className='center home'>
                  <Pagination
                  variant='outlined'
                  count={lastPage}
                  page={page}
                  onChange={handleChange}
                  id='pagination'
                  />
                </div>
              </>
              :
              <EmptyProductsMessage imageUrl='/images/empty-product.svg'>
                Products not available at this moment
              </EmptyProductsMessage>
            }
          </>
        }
      </div>
      { message && <CustomAlert severity='success'>{message}</CustomAlert> }
      <Footer />
    </div>
  );
};
