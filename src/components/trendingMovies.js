import { Box, Button, Typography } from '@mui/material';
import { MovieCard } from './MovieCard';

export function TrendingMovies({ onSelectMovie }) {
  const trendingMovies = [
    {
      id: 1,
       title: 'Interstellar',
      poster_path: './assets/interstellar.jpg',
      release_date: '2023-01-01',
      vote_average: 7.8,
    },
    {
      id: 2,
         title: 'Interstellar',
      poster_path: './assets/interstellar.jpg',
      release_date: '2023-02-01',
      vote_average: 8.2,
    },
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 3 }}>
      {trendingMovies.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="body1" color="text.secondary">
            Loading trending movies...
          </Typography>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: 2,
            }}
          >
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} onClick={() => onSelectMovie(movie)} />
            ))}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ minWidth: 150, borderRadius: 2, textTransform: 'none' }}
              onClick={() => console.log('Load more trending')}
            >
              Load More
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
}