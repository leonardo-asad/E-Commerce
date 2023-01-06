import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { Box } from '@mui/material';
import { useSearchParams } from "react-router-dom";


interface Props {
  name: string
  image: string
}

export default function CategoryItem({ name, image }: Props) {
  let [, setSearchParams] = useSearchParams();

  return (
    <Card
    onClick={() => setSearchParams({category: name})}
    style={{
      display: "flex",
      flexDirection: "column",
      height: "130px",
      backgroundColor: 'transparent',
      boxShadow: 'none'
    }}
    >
      <CardActionArea>
        <Box
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems:"center",
          margin: 'auto'
        }}
        >
          <CardMedia
            component="img"
            sx={{
              height: "80px",
              width: "80px",
              borderRadius: "50%",
              objectPosition: "50% 50%"
            }}
            image={image}
            alt={name}
          />
        </Box>
        <CardContent
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: '50px',
          padding: 0
        }}
        >
          <Typography
          sx={{
            fontSize: '10px',
            textAlign: 'center',
            margin: 0
            }}
            >
            {name}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
