import * as React from 'react';
import CategoryItem from '../CategoryItem/CategoryItem';
import { Box } from '@mui/material';
import Grid from '@mui/material/Grid';

const categories = [
  {name: 'Antiques & Collectables', image: 'https://www.liveabout.com/thmb/9y6Mh-GXPTBA3PNpfdvURKPEzHs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/old-clocks-670829828-5aea5f5aff1b780036cb9cce.jpg'},
  {name: 'Baby Gear', image: 'https://media.istockphoto.com/id/625379326/photo/organic-cosmetic-children-for-bath-on-wooden-bakground-close-up.jpg?b=1&s=170667a&w=0&k=20&c=Zsrhv2BInxdUvtgXg8PFo6ZxRbc5GZd5A4G-8F_3zfk='},
  {name: 'Clothing & Fashion', image: 'https://img.freepik.com/free-photo/interior-kids-room-decoration-with-clothes_23-2149096035.jpg?w=2000'},
  {name: 'Computers', image: 'https://webobjects2.cdw.com/is/image/CDW/6482128?$product-main$'},
  {name: 'Home & living', image: 'https://houseandhome.com/wp-content/uploads/2020/12/feature-LivingRoom-091_TREES_HH_AP20_40.jpg'},
  {name: 'Mobile phones', image: 'https://news.bizleadershub.com/wp-content/uploads/2021/11/mobile-1.jpg'},
  {name: 'Music & instruments', image: 'https://images.pexels.com/photos/34221/violin-musical-instrument-music-sound.jpg?auto=compress&cs=tinysrgb&w=1600'}
]

export default function CategoriesStack() {
  return (
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
      justifyContent="center"
      alignItems="stretch"
      spacing={2}
      sx={{width: "1200px"}}
      >
      {
        categories.map(category => {
          return <CategoryItem name={category.name} image={category.image}/>
        })
      }
      </Grid>
    </Box>
  );
}
