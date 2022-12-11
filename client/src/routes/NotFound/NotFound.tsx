import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ErrorIcon from '@mui/icons-material/Error';
import CustomAvatar from '../../components/Avatar/Avatar';

export default function NotFound() {
  return (
    <Box sx={{
    display: 'flex',
    direction: 'row',
    justifyContent: 'center',
    margin: 20
    }}>
      <Grid
      container
      direction={"column"}
      alignContent="center"
      >
        <Grid item xs
        sx={{
          display: "flex",
          direction: "row",
          justifyContent: "center"
        }}
        >
          <CustomAvatar>
            <ErrorIcon />
          </CustomAvatar>
        </Grid>
        <Grid item xs>
          <Typography
          variant="h3"
          sx={{
            textAlign:"center",
            }}>
            Page Not Found
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}
