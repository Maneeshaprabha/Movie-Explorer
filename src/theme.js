
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

export default theme;