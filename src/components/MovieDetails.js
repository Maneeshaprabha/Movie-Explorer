import { useState } from 'react';
import {
  Box,
  CardMedia,
  Typography,
  IconButton,
  Chip,
  Divider,
  Button,
} from '@mui/material';
import {
  Close as CloseIcon,
  Favorite as HeartIcon,
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon,
  Star as StarIcon,
} from '@mui/icons-material';

export function MovieDetails({ movie, onClose }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const movieData = {
    ...movie,
    overview: 'The film follows a group of astronauts who travel through a wormhole near Saturn in search of a new home for mankind.',
    runtime: 120,
    genres: [{ id: 1, name: 'Action' }, { id: 2, name: 'Adventure' }],
    cast: [
      { id: 101, name: 'Actor One' },
      { id: 102, name: 'Actor Two' },
    ],
    videos: [{ key: 'IpzucC0cQIg', site: 'YouTube', type: 'Trailer' }],
  };

  const backdropUrl = movieData.backdrop_path || './assets/image1.jpg';
  const posterUrl = movieData.poster_path || './assets/image2.jpg';

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`; 
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        bgcolor: 'rgba(0,0,0,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        zIndex: 1300,
      }}
    >
      <Box
        sx={{
          bgcolor: 'background.paper',
          borderRadius: 2,
          maxWidth: 900,
          maxHeight: '90vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ position: 'relative', height: { xs: 200, md: 300 } }}>
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
          <IconButton
            onClick={onClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'grey.200' },
            }}
          >
            <CloseIcon />
          </IconButton>
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
                onClick={() => setIsFavorite(!isFavorite)}
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
              {movieData.videos.length > 0 && (
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