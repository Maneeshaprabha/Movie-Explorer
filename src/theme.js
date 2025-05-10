
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#e91e63', 
      contrastText: '#fff',
    },
    secondary: {
      main: '#e0e0e0', 
      contrastText: '#212121',
    },
    background: {
      default: '#ffffff', 
      paper: '#ffffff', 
    },
    text: {
      primary: '#212121', 
      secondary: '#757575',
    },
    error: {
      main: '#ef5350', 
    },
  },
  shape: {
    borderRadius: 12, 
    
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});


const lightTheme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  palette: {
    mode: 'light',
    background: {
      default: 'hsl(0, 0%, 100%)',
      paper: 'hsl(0, 0%, 100%)',
    },
    text: {
      primary: 'hsl(240, 10%, 3.9%)',
      secondary: 'hsl(240, 3.8%, 46.1%)',
    },
    primary: {
      main: 'hsl(346, 77%, 49%)',
      contrastText: 'hsl(355.7, 100%, 97.3%)',
    },
    secondary: {
      main: 'hsl(240, 4.8%, 95.9%)',
      contrastText: 'hsl(240, 5.9%, 10%)',
    },
    error: {
      main: 'hsl(0, 84.2%, 60.2%)',
      contrastText: 'hsl(0, 0%, 98%)',
    },
    divider: 'hsl(240, 5.9%, 90%)',
    grey: {
      100: 'hsl(240, 5%, 95%)',
      200: 'hsl(240, 5%, 90%)',
      300: 'hsl(240, 5%, 85%)',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

const darkTheme = createTheme({
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
  palette: {
    mode: 'dark',
    background: {
      default: 'hsl(20, 14.3%, 4.1%)',
      paper: 'hsl(24, 9.8%, 10%)',
    },
    text: {
      primary: 'hsl(0, 0%, 95%)',
      secondary: 'hsl(240, 5%, 64.9%)',
    },
    primary: {
      main: 'hsl(346, 77%, 49%)',
      contrastText: 'hsl(355.7, 100%, 97.3%)',
    },
    secondary: {
      main: 'hsl(240, 3.7%, 15.9%)',
      contrastText: 'hsl(0, 0%, 98%)',
    },
    error: {
      main: 'hsl(0, 62.8%, 30.6%)',
      contrastText: 'hsl(0, 85.7%, 97.3%)',
    },
    divider: 'hsl(240, 3.7%, 15.9%)',
    grey: {
      100: 'hsl(240, 5%, 15%)',
      200: 'hsl(240, 5%, 20%)',
      300: 'hsl(240, 5%, 25%)',
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export { lightTheme, darkTheme };

export default theme;