import React, { useState } from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
  ThemeProvider,
  createTheme,
  styled,
} from '@mui/material';

const Root = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: theme.palette.background.default,
  padding: theme.spacing(2),
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.background.paper,
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
});

const Content = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const SearchBar = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const TabsContainer = styled(Tabs)(({ theme }) => ({
  maxWidth: 400,
  margin: '0 auto',
  marginTop: theme.spacing(2),
}));

const GridContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
  gap: theme.spacing(2),
  marginTop: theme.spacing(2),
}));

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
});

export function MovieDashboard() {
  const [tabValue, setTabValue] = useState('trending');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <Root>
        <StyledAppBar position="static">
          <StyledToolbar>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              <span style={{ color: '#e91e63' }}>Movie</span> Explorer
            </Typography>
          </StyledToolbar>
        </StyledAppBar>
        <Content>
          <SearchBar>
            <input
              placeholder="Search for movies..."
              style={{
                width: '100%',
                padding: 12,
                borderRadius: 12,
                border: '1px solid #ccc',
              }}
            />
          </SearchBar>
          <TabsContainer value={tabValue} onChange={handleTabChange}>
            <Tab label="Trending" value="trending" />
            <Tab label="Search" value="search" />
            <Tab label="Favorites" value="favorites" />
          </TabsContainer>
          <GridContainer>
            <Box bgcolor="grey.200" height={240} borderRadius={12} />
            <Box bgcolor="grey.200" height={240} borderRadius={12} />
            <Box bgcolor="grey.200" height={240} borderRadius={12} />
            <Box bgcolor="grey.200" height={240} borderRadius={12} />
            <Box bgcolor="grey.200" height={240} borderRadius={12} />
          </GridContainer>
        </Content>
      </Root>
    </ThemeProvider>
  );
}
