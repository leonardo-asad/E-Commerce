// Import React library
import React from 'react';

// Import Components
import Carousel from "react-multi-carousel";
import CategoryItem from '../CategoryItem/CategoryItem';
import Typography from '@mui/material/Typography';

// Redux Imports
import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categorySlice/categorySlice";

// Import Style sheets
import "react-multi-carousel/lib/styles.css";
import "./Carousel.css"

// Responsive Configuration
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
      <div className='center home'>
        <Typography
        sx={{
          fontFamily: 'Proxima Nova',
          fontSize: '20px',
          color: '#666'
        }}
        >
          Categories
        </Typography>
      </div>
      <div className='center home'>
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
      </div>
    </>
  )
};
