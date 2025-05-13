import { useContext} from 'react';
import { TextField,Box, InputAdornment, IconButton, Button } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { MovieContext } from '../context/MovieProvider';

export function SearchBar({ onSearch }) {
  const { searchQuery, setSearchQuery } = useContext(MovieContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    } else {
      setSearchQuery(searchQuery);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };
  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
      <TextField
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for movies..."
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton onClick={clearSearch} aria-label="Clear search">
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          mb: 2,
          bgcolor: 'background.paper',
          borderRadius: 2,
          '& .MuiOutlinedInput-root': {
            borderRadius: 2,
          },
        }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={!searchQuery.trim()}
        sx={{ borderRadius: 2, textTransform: 'none', width: '100%' }}
      >
        Search
      </Button>
    </Box>
  );
}