     import { useContext } from 'react';
import { Box, Typography, Chip, AppBar, Toolbar, IconButton } from '@mui/material';
import { MovieCard } from './MovieCard';
import { FavoriteBorder as HeartIcon, ArrowBack as BackIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { MovieContext } from '../context/MovieProvider';

export function FavoriteMovies() {
  const { favorites } = useContext(MovieContext);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <IconButton color="inherit" component={Link} to="/" aria-label="Back">
            <BackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            <span style={{ color: 'primary.main' }}>Your</span> Favorites
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        {favorites.length === 0 ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 8, textAlign: 'center' }}>
            <Box sx={{ p: 3, bgcolor: 'grey.100', borderRadius: '50%', mb: 2 }}>
              <HeartIcon sx={{ fontSize: 40, color: 'text.secondary' }} />
            </Box>
            <Typography variant="h6" sx={{ mb: 1 }}>
              No favorites yet
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400 }}>
              Click the heart icon on any movie to add it to your favorites. Your favorites will appear here.
            </Typography>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h5">Your Favorite Movies</Typography>
              <Chip label={`${favorites.length} movies`} size="small" color="primary" />
            </Box>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: 'repeat(auto-fill, minmax(140px, 1fr))',
                  sm: 'repeat(auto-fill, minmax(160px, 1fr))',
                  md: 'repeat(auto-fill, minmax(180px, 1fr))',
                },
                gap: 2,
              }}
            >
              {favorites.map((movie) => (
                <MovieCard key={movie.movieId} movie={movie} />
              ))}
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}