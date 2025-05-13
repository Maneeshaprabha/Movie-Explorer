import { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Typography, AppBar, Toolbar, IconButton } from '@mui/material';
import { Logout as LogoutIcon, Favorite as HeartIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm } from './LoginForm';
import { MovieDashboard } from './MovieDashboard';
import { ThemeToggle } from './ThemeToggle';
import { useSnackbar } from 'notistack';

export function MovieExplorer({ setThemeMode }) {
  const [activeTab, setActiveTab] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
      setActiveTab('explore');
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setActiveTab('login');
    }
  }, []);

  const handleLogin = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setIsLoggedIn(true);
    setUser(userData);
    setActiveTab('explore');
    enqueueSnackbar('Logged in successfully', { variant: 'success' });
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    setActiveTab('login');
    enqueueSnackbar('Logged out successfully', { variant: 'success' });
    navigate('/');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }} component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <span style={{ color: 'primary.main' }}>Movie</span> Explorer
          </Typography>
          {isLoggedIn && (
            <Typography variant="body2" sx={{ mr: 2 }}>
              Welcome, {user?.username}
            </Typography>
          )}
          <ThemeToggle setThemeMode={setThemeMode} />
          {isLoggedIn && (
            <>
              <IconButton color="inherit" component={Link} to="/favorites" aria-label="Favorites">
                <HeartIcon />
              </IconButton>
              <IconButton color="inherit" onClick={handleLogout} aria-label="Logout">
                <LogoutIcon />
              </IconButton>
            </>
          )}
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