import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
    xxxl: true;
    xxxxl: true;
    xxxxxl: true;
    xxxxxxl: true;
    xxxxxxxl: true;

  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
      xxl: 1800,
      xxxl: 2000,
      xxxxl: 2700,
      xxxxxl: 3500,
      xxxxxxl: 5000,
      xxxxxxxl: 7000,
    },
  },
  palette: {
    primary: {
      main: "#B34270",
    },
    secondary: {
      main: "#713770",
    },
  },
});
