// Import React library
import React from 'react';

// Import Components
import Paper from '@mui/material/Paper';
import GitHubIcon from '@mui/icons-material/GitHub';
import Stack from '@mui/material/Stack';

// Import Style sheets
import './Footer.css'

export default function Footer() {
  return (
    <Paper
    sx={{
    backgroundColor: "#fff",
    width: '100%',
    height: '85px',
    borderRadius: 0,
    marginTop: 2,
    display: "flex",
    direction: "column",
    justifyContent: "center",
    alignItems: "center"
    }}
    elevation={12}
    >
      <Stack
      direction={"row"}
      spacing={1}
      alignItems="center"
      >
        <GitHubIcon />
        <a
        href="https://github.com/leonardo-asad/E-Commerce"
        target="_blank"
        rel="noopener noreferrer"
        className="repo"
        >
          Github Repository
        </a>
      </Stack>

    </Paper>
  )
}
