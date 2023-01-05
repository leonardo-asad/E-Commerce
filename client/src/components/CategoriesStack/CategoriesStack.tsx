import React, { useEffect } from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import CircularIndeterminate from '../LoadingIcon/CircularIndeterminate';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoadingCategories, selectCategories, loadCategories } from '../../store/categorySlice/categorySlice';
import { AppDispatch } from '../../store/store';
import Typography from '@mui/material/Typography';

export default function CategoriesStack() {
  const dispatch = useDispatch<AppDispatch>();
  const categories = useSelector(selectCategories);
  const isLoadingCategories = useSelector(selectIsLoadingCategories);

  useEffect(() => {
    async function load() {
      await dispatch(loadCategories());
    }

    load();
  }, [dispatch]);

  return (
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
        Categories
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
      {
        isLoadingCategories ?
        <CircularIndeterminate />
        :
        <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
        sx={{width: "1200px"}}
        >
        {
          categories.map(category => {
            return (
            <CategoryItem
            key={category.name}
            name={category.name}
            image={category.image_url}
            />)
          })
        }
        </Grid>
      }
    </Box>
    </>

  );
}
