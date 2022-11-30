import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function NotFound() {
  return (
    <Box sx={{ width: '100%', maxWidth: 500 }}>
      <Typography variant="h1" gutterBottom>
        Page Not Found
      </Typography>
    </Box>
  )
}
