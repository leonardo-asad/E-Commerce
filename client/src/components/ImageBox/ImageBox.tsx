import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';

interface Props {
  image: React.ReactElement
}

export default function ImageBox({ image }: Props) {
  return (
    <Box sx={{ width: '100%',borderRadius: 'sm', p: 1 }}>
      <AspectRatio objectFit="contain">
        {image}
      </AspectRatio>
    </Box>
  );
}
