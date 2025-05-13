import { Alert, AlertTitle, Button, Box, Typography, Link } from '@mui/material';
import { Warning as AlertTriangle } from '@mui/icons-material';

export function ApiKeyWarning() {
  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', p: 3, bgcolor: 'background.default' }}>
      <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
        <AlertTriangle sx={{ fontSize: 20, mr: 1 }} />
        <AlertTitle>API Key Error</AlertTitle>
        The TMDB API key is missing or invalid. Please contact the administrator.
      </Alert>
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 3,
          borderRadius: 2,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          How to fix this issue:
        </Typography>
        <ol style={{ paddingLeft: 20, marginBottom: 16 }}>
          <li>
            Get a valid TMDB API key from{' '}
            <Link
              href="https://www.themoviedb.org/settings/api"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
            >
              themoviedb.org
            </Link>
          </li>
          <li>Add the API key to the .env file as REACT_APP_TMDB_API_KEY</li>
          <li>Restart the application</li>
        </ol>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ borderRadius: 2, textTransform: 'none' }}
          onClick={() => window.location.reload()}
        >
          Reload Page
        </Button>
      </Box>
    </Box>
  );
}