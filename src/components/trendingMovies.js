import { useState, useEffect, useContext } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { MovieCard } from './MovieCard';
import axios from 'axios';
import { useSnackbar } from 'notistack';
import { MovieContext } from '../context/MovieProvider';
import { ApiKeyWarning } from './ApiKeyWarning';

export function TrendingMovies() {
  const { filters } = useContext(MovieContext);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [apiError, setApiError] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setTrendingMovies([]);
    setPage(1);
    setHasMore(true);
    fetchTrending(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const fetchTrending = async (pageNum) => {
    if (!process.env.REACT_APP_TMDB_API_KEY) {
      setApiError(true);
      return;
    }
    setLoading(true);
    try {
      let url = filters.genre || filters.year || filters.rating
        ? `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${pageNum}`
        : `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.REACT_APP_TMDB_API_KEY}&page=${pageNum}`;
      if (filters.genre) url += `&with_genres=${filters.genre}`;
      if (filters.year) url += `&primary_release_year=${filters.year}`;
      if (filters.rating) url += `&vote_average.gte=${filters.rating}`;
      const response = await axios.get(url);
      setTrendingMovies((prev) => [...prev, ...response.data.results]);
      setHasMore(response.data.page < response.data.total_pages);
    } catch (err) {
      enqueueSnackbar('Error fetching trending movies', { variant: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchTrending(nextPage);
  };

  if (apiError) {
    return <ApiKeyWarning />;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 3 }}>
      {loading && trendingMovies.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="body1" color="text.secondary">
            Loading trending movies...
          </Typography>
        </Box>
      ) : trendingMovies.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="body1" color="text.secondary">
            No trending movies available.
          </Typography>
        </Box>
      ) : (
        <>
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
            {trendingMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </Box>
          {hasMore && (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <Button
                variant="outlined"
                color="primary"
                sx={{ minWidth: 150, borderRadius: 2, textTransform: 'none' }}
                onClick={loadMore}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Load More'}
              </Button>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}