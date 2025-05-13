import { useState, useEffect, useContext } from 'react';
import {
  Box,
  CardMedia,
  Typography,
  IconButton,
  Chip,
  Divider,
  Button,
  AppBar,
  Toolbar,
} from '@mui/material';
import {
  ArrowBack as BackIcon,
  Favorite as HeartIcon,
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { MovieContext } from '../context/MovieProvider';
import { ApiKeyWarning } from './ApiKeyWarning';

export function MovieDetails() {
  const { id } = useParams();
  const { favorites, addFavorite, removeFavorite } = useContext(MovieContext);
  const [movieData, setMovieData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const isFavorite = favorites.some((fav) => fav.movieId === parseInt(id));

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!process.env.REACT_APP_TMDB_API_KEY) {
        setApiError(true);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const [movieResponse, creditsResponse, videosResponse] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${process.env.REACT_APP_TMDB_API_KEY}`),
          axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`),
        ]);
        setMovieData({
          ...movieResponse.data,
          cast: creditsResponse.data.cast,
          videos: videosResponse.data.results,
        });
      } catch (err) {
        enqueueSnackbar('Error fetching movie details', { variant: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(parseInt(id));
      enqueueSnackbar('Removed from favorites', { variant: 'success' });
    } else {
      const movie = {
        id: movieData.id,
        title: movieData.title,
        poster_path: movieData.poster_path,
        release_date: movieData.release_date,
        vote_average: movieData.vote_average,
      };
      addFavorite(movie);
      enqueueSnackbar('Added to favorites', { variant: 'success' });
    }
  };

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  if (apiError) {
    return <ApiKeyWarning />;
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Typography variant="body1" color="text.secondary">
          Loading...
        </Typography>
      </Box>
    );
  }

  if (!movieData) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <Typography variant="body1" color="text.secondary">
          Failed to load movie details.
        </Typography>
      </Box>
    );
  }

  const backdropUrl = movieData.backdrop_path
    ? `https://image.tmdb.org/t/p/w1280${movieData.backdrop_path}`
    : '/placeholder.svg';
  const posterUrl = movieData.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
    : '/placeholder.svg';

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar position="static" sx={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <IconButton color="inherit" component={Link} to="/" aria-label="Back">
            <BackIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 700 }}>
            <span style={{ color: 'primary.main' }}>Movie</span> Details
          </Typography>
        </Toolbar>
      </AppBar>
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3 }}>
        <Box sx={{ position: 'relative', height: { xs: 200, sm: 300, md: 400 } }}>
          <CardMedia
            component="img"
            image={backdropUrl}
            alt={movieData.title}
            sx={{ objectFit: 'cover', height: '100%' }}
          />
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
            }}
          />
        </Box>
        <Box sx={{ p: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
          <Box sx={{ display: { xs: 'none', md: 'block' }, width: '30%' }}>
            <CardMedia
              component="img"
              image={posterUrl}
              alt={movieData.title}
              sx={{ borderRadius: 2, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Typography variant="h4">{movieData.title}</Typography>
              <Button
                variant={isFavorite ? 'contained' : 'outlined'}
                color="primary"
                startIcon={<HeartIcon />}
                onClick={handleFavoriteClick}
                sx={{ borderRadius: 2, textTransform: 'none' }}
              >
                {isFavorite ? 'Favorited' : 'Favorite'}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
              {movieData.genres.map((genre) => (
                <Chip key={genre.id} label={genre.name} variant="outlined" size="small" />
              ))}
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 2, color: 'text.secondary' }}>
              {movieData.release_date && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <CalendarIcon fontSize="small" />
                  <Typography variant="body2">{new Date(movieData.release_date).getFullYear()}</Typography>
                </Box>
              )}
              {movieData.runtime && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ClockIcon fontSize="small" />
                  <Typography variant="body2">{formatRuntime(movieData.runtime)}</Typography>
                </Box>
              )}
              {movieData.vote_average && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <StarIcon fontSize="small" sx={{ color: 'yellow' }} />
                  <Typography variant="body2">{movieData.vote_average.toFixed(1)}/10</Typography>
                </Box>
              )}
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Box>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  Overview
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movieData.overview || 'No overview available.'}
                </Typography>
              </Box>
              {movieData.cast && movieData.cast.length > 0 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Cast
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {movieData.cast.slice(0, 5).map((person) => (
                      <Chip key={person.id} label={person.name} variant="filled" size="small" />
                    ))}
                    {movieData.cast.length > 5 && (
                      <Chip label={`+${movieData.cast.length - 5} more`} variant="outlined" size="small" />
                    )}
                  </Box>
                </Box>
              )}
              {movieData.videos && movieData.videos.length > 0 && (
                <Box>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    Trailer
                  </Typography>
                  <Box sx={{ position: 'relative', paddingTop: '56.25%', borderRadius: 2, overflow: 'hidden' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${movieData.videos[0].key}`}
                      title={`${movieData.title} trailer`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    ></iframe>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}