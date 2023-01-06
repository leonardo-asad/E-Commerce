import React from 'react';
import Carousel from "react-multi-carousel";
import CategoryItem from '../CategoryItem/CategoryItem';
import "react-multi-carousel/lib/styles.css";
import "./Carousel.css"
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categorySlice/categorySlice";
import { Box } from '@mui/material';
import Typography from '@mui/material/Typography';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 10
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 10
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 5
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 3
  }
};

export default function CategoryCarousel() {
  const categories = useSelector(selectCategories);

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
          marginY: 2,
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
      }}
      >
        <Carousel
        responsive={responsive}
        containerClass="carousel-container"
        >
          {
            categories.map(category => {
              return (
                <CategoryItem
                key={category.name}
                name={category.name}
                image={category.image_url}
                />
              )
            })
          }
        </Carousel>
      </Box>
    </>
  )
};
