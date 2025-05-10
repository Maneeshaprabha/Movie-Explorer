import { useState } from 'react';
import { Tabs, Tab, Box, Chip, Typography } from '@mui/material';
import { SearchBar } from './SearchBar';
import { MovieGrid } from './movieGrid';
import { MovieDetails } from './MovieDetails';
import { TrendingMovies } from './TrendingMovies';
import { FavoriteMovies } from './favoriteMovies';

export function MovieDashboard() {
  const [activeTab, setActiveTab] = useState('trending');
  const [selectedMovie, setSelectedMovie] = useState(null);

  const favorites = [
    // { id: 1, title: 'Sample Movie 1' },
    // { id: 2, title: 'Sample Movie 2' },
  ];

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    setActiveTab('search');
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseDetails = () => {
    setSelectedMovie(null);
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3, bgcolor: 'background.default' }}>
      <SearchBar onSearch={handleSearch} />
      {selectedMovie ? (
        <MovieDetails movie={selectedMovie} onClose={handleCloseDetails} />
      ) : (
        <>
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            centered
            sx={{ mt: 3, bgcolor: 'background.paper', borderRadius: 2 }}
          >
            <Tab label="Trending" value="trending" />
            <Tab label="Search" value="search" />
            <Tab
              label={
                <Box sx={{ position: 'relative' }}>
                  Favorites
                  {favorites.length > 0 && (
                    <Chip
                      label={favorites.length}
                      color="primary"
                      size="small"
                      sx={{ position: 'absolute', top: -8, right: -8 }}
                    />
                  )}
                </Box>
              }
              value="favorites"
            />
          </Tabs>
          {activeTab === 'trending' && <TrendingMovies onSelectMovie={handleMovieSelect} />}
          {activeTab === 'search' && <MovieGrid onSelectMovie={handleMovieSelect} />}
          {activeTab === 'favorites' && <FavoriteMovies onSelectMovie={handleMovieSelect} />}
        </>
      )}
    </Box>
  );
}