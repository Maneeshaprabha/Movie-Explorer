import { Box, Typography, Chip } from '@mui/material';
import { MovieCard } from './MovieCard';
import { FavoriteBorder as HeartIcon } from '@mui/icons-material';
// import InterstellarImage from './assets/Interstellar.jpg';

export function FavoriteMovies({ onSelectMovie }) {
  const favorites = [
    {
      id: 1,
      title: 'Interstellar',
    poster_path: './assets/interstellar.jpg',
      release_date: '2023-01-01',
      vote_average: 7.5,
    },
  ];

  return (
    <Box sx={{ py: 3 }}>
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
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: 2,
            }}
          >
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onClick={() => onSelectMovie(movie)} />
            ))}
          </Box>
        </>
      )}
    </Box>
  );
}