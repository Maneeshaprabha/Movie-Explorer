import { IconButton } from '@mui/material';
import { Brightness4 } from '@mui/icons-material';

export function ThemeToggle({ setThemeMode }) {
  return (
    <IconButton
      onClick={() => setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'))}
      color="inherit"
      aria-label="Toggle theme"
      sx={{ '&:hover': { bgcolor: 'grey.200' } }}
    >
      <Brightness4 />
    </IconButton>
  );
}