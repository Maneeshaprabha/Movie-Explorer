import { useContext, useState } from 'react';
import { Card, CardMedia, Typography, IconButton, Box, Chip } from '@mui/material';
import { Favorite as HeartIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { MovieContext } from '../context/MovieProvider';
import { useSnackbar } from 'notistack';

export function MovieCard({ movie }) {
  const { favorites, addFavorite, removeFavorite } = useContext(MovieContext);
  const [imageLoaded, setImageLoaded] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const isFavorite = favorites.some((fav) => fav.movieId === movie.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(movie.id);
      enqueueSnackbar('Removed from favorites', { variant: 'success' });
    } else {
      addFavorite(movie);
      enqueueSnackbar('Added to favorites', { variant: 'success' });
    }
  };

  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : '/placeholder.svg';

  return (
    <Card
      sx={{
        position: 'relative',
        cursor: 'pointer',
        transition: 'box-shadow 0.3s',
        '&:hover': { boxShadow: '0 4px 20px rgba(0,0,0,0.1)' },
        bgcolor: 'background.paper',
        borderRadius: 2,
      }}
      onClick={() => navigate(`/movie/${movie.id}`)}
    >
      <Box sx={{ position: 'relative', aspectRatio: '2/3', overflow: 'hidden' }}>
        {!imageLoaded && (
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              bgcolor: 'grey.300',
              animation: 'pulse 1.5s infinite',
            }}
          />
        )}
        <CardMedia
          component="img"
          image={imageUrl}
          alt={movie.title || 'Movie poster'}
          sx={{
            transition: 'transform 0.5s',
            '&:hover': { transform: 'scale(1.05)' },
            opacity: imageLoaded ? 1 : 0,
            height: '100%',
          }}
          onLoad={() => setImageLoaded(true)}
        />
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            bgcolor: isFavorite ? 'primary.main' : 'background.paper',
            '&:hover': { bgcolor: isFavorite ? 'primary.dark' : 'grey.200' },
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          <HeartIcon sx={{ color: isFavorite ? 'primary.contrastText' : 'text.secondary' }} />
        </IconButton>
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            p: 2,
            bgcolor: 'rgba(0,0,0,0.7)',
            color: 'white',
          }}
        >
          <Typography variant="subtitle1" noWrap>
            {movie.title || 'Movie Title'}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
            <Typography variant="caption">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </Typography>
            <Chip
              label={movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
              color="primary"
              size="small"
            />
          </Box>
        </Box>
      </Box>
    </Card>
  );
}