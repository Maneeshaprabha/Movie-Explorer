import { useState, useContext } from 'react';
import { Tabs, Tab, Box, Chip, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { SearchBar } from './SearchBar';
import { MovieGrid } from './movieGrid';
import { TrendingMovies } from './TrendingMovies';
import { MovieContext } from '../context/MovieProvider';

//now 
export function MovieDashboard() {
  const [activeTab, setActiveTab] = useState('trending');
  const { filters, setFilters, genres } = useContext(MovieContext);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', p: 3, bgcolor: 'background.default' }}>
      <SearchBar />
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            name="genre"
            value={filters.genre}
            onChange={handleFilterChange}
            label="Genre"
          >
            <MenuItem value="">All</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select
            name="year"
            value={filters.year}
            onChange={handleFilterChange}
            label="Year"
          >
            <MenuItem value="">All</MenuItem>
            {[...Array(50)].map((_, i) => {
              const year = new Date().getFullYear() - i;
              return <MenuItem key={year} value={year}>{year}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Rating</InputLabel>
          <Select
            name="rating"
            value={filters.rating}
            onChange={handleFilterChange}
            label="Rating"
          >
            <MenuItem value="">All</MenuItem>
            {[9, 8, 7, 6, 5, 4, 3, 2, 1].map((rating) => (
              <MenuItem key={rating} value={rating}>{rating}+</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Tabs
        value={activeTab}
        onChange={(e, newValue) => setActiveTab(newValue)}
        centered
        sx={{ mt: 3, bgcolor: 'background.paper', borderRadius: 2 }}
      >
        <Tab label="Trending" value="trending" />
        <Tab label="Search" value="search" />
      </Tabs>
      {activeTab === 'trending' && <TrendingMovies />}
      {activeTab === 'search' && <MovieGrid />}
    </Box>
  );
}