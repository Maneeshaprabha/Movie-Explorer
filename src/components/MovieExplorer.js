import { useState } from 'react';
import { Tabs, Tab, Box, Typography, AppBar, Toolbar } from '@mui/material';
import { LoginForm } from './LoginForm';
import { MovieDashboard } from './MovieDashboard';
import { ThemeToggle } from './ThemeToggle';

export function MovieExplorer({ setThemeMode }) {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab('explore');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            <span style={{ color: 'primary.main' }}>Movie</span> Explorer
          </Typography>
          <ThemeToggle setThemeMode={setThemeMode} />
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            textColor="inherit"
            indicatorColor="secondary"
            sx={{ ml: 2 }}
          >
            <Tab label="Login" value="login" disabled={isLoggedIn} />
            <Tab label="Explore" value="explore" disabled={!isLoggedIn} />
          </Tabs>
        </Toolbar>
      </AppBar>
      <Box sx={{ p: 3 }}>
        {activeTab === 'login' && <LoginForm onLogin={handleLogin} />}
        {activeTab === 'explore' && <MovieDashboard />}
      </Box>
    </Box>
  );
}