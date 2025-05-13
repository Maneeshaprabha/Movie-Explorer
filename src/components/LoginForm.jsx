// import { Box, TextField, Button, Typography, Card, CardHeader, CardContent } from '@mui/material';
// import { Movie as FilmIcon } from '@mui/icons-material';
// import { makeStyles } from '@mui/styles';
// import { LoginForm } from './../context/AuthContext';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     minHeight: '100vh',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     background: theme.palette.background.default,
//     padding: theme.spacing(2),
//   },
//   card: {
//     maxWidth: 400,
//     width: '100%',
//   },
//   header: {
//     textAlign: 'center',
//   },
//   iconContainer: {
//     width: 64,
//     height: 64,
//     borderRadius: '50%',
//     background: `${theme.palette.primary.main}10`,
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     margin: '0 auto',
//     marginBottom: theme.spacing(2),
//   },
//   form: {
//     display: 'flex',
//     flexDirection: 'column',
//     gap: theme.spacing(2),
//   },
//   footer: {
//     marginTop: theme.spacing(2),
//     textAlign: 'center',
//   },
// }));

// export function LoginForm() {
//   const classes = useStyles();

//   return (
//     <Box className={classes.root}>
//       <Card className={classes.card}>
//         <CardHeader
//           className={classes.header}
//           title={
//             <>
//               <Box className={classes.iconContainer}>
//                 <FilmIcon style={{ fontSize: 32, color: '#e91e63' }} />
//               </Box>
//               <Typography variant="h5">Welcome Back</Typography>
//             </>
//           }
//           subheader={<Typography variant="body2" color="textSecondary">Enter your credentials to access your account</Typography>}
//         />
//         <CardContent>
//           <Box className={classes.form}>
//             <TextField label="Username" placeholder="Enter your username" fullWidth />
//             <TextField label="Password" type="password" placeholder="••••••••" fullWidth />
//             <Button variant="contained" color="primary" fullWidth>
//               Sign In
//             </Button>
//             <Typography variant="caption" className={classes.footer} color="textSecondary">
//               By continuing, you agree to our Terms of Service and Privacy Policy.
//             </Typography>
//           </Box>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }
// 
// 
// 
// import React, { useState } from 'react';

// import React, { useState } from 'react';

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleLogin = (e) => {
//     e.preventDefault();
//     if (email === 'admin@example.com' && password === 'admin123') {
//       alert('Login successful');
//       setError('');
//     } else {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <br />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <br />
//         <button type="submit">Login</button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default LoginForm;








import { useState } from 'react';
import { Button, TextField, Card, CardContent, CardHeader, Typography, Box } from '@mui/material';
import { Movie as FilmIcon } from '@mui/icons-material';
import { useSnackbar } from 'notistack';

export function LoginForm({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (isLogin) {
      const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (storedUser.username === username && storedUser.password === password) {
        onLogin({ username });
        enqueueSnackbar('Logged in successfully', { variant: 'success' });
      } else {
        enqueueSnackbar('Invalid username or password', { variant: 'error' });
      }
    } else {
      const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
      if (existingUser.username) {
        enqueueSnackbar('User already exists. Please log in.', { variant: 'error' });
      } else {
        localStorage.setItem('user', JSON.stringify({ username, password }));
        setIsLogin(true);
        enqueueSnackbar('Registered successfully. Please log in.', { variant: 'success' });
      }
    }
    setIsLoading(false);
  };
  
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
        backgroundColor: '#f9f9f9',
      }}
    >
      <Card
        sx={{
          maxWidth: 400,
          width: '100%',
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        }}
      >
        <CardHeader
          title={
            <Box sx={{ textAlign: 'center' }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  backgroundColor: '#e91e6310',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mx: 'auto',
                  mb: 2,
                }}
              >
                <FilmIcon sx={{ fontSize: 32, color: '#e91e63' }} />
              </Box>
              <Typography variant="h5">
                {isLogin ? 'Log In' : 'Create an Account'}
              </Typography>
              <Typography variant="body2" color="text.secondary" mt={1}>
                {isLogin
                  ? 'Enter your credentials to access your account'
                  : 'Fill in the details to sign up'}
              </Typography>
            </Box>
          }
        />
        <CardContent>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              mt: 2,
            }}
          >
            <TextField
              label="Username"
              placeholder="Enter your username"
              fullWidth
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {!isLogin && (
              <TextField
                label="Email"
                type="email"
                placeholder="Enter your email"
                fullWidth
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
            <TextField
              label="Password"
              type="password"
              placeholder="••••••••"
              fullWidth
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              inputProps={{ minLength: 6 }}
            />
            {!isLogin && (
              <TextField
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                fullWidth
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            )}
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              disabled={isLoading}
              sx={{ borderRadius: 2, textTransform: 'none' }}
            >
              {isLoading
                ? isLogin
                  ? 'Logging in...'
                  : 'Signing up...'
                : isLogin
                ? 'Sign In'
                : 'Sign Up'}
            </Button>
          </Box>
        </CardContent>
        <Box textAlign="center" mt={2} mb={3}>
          {isLogin ? (
            <Typography variant="body2">
              Don't have an account?{' '}
              <Button
                onClick={() => setIsLogin(false)}
                sx={{ color: '#e91e63', textTransform: 'none', fontWeight: 600 }}
              >
                Sign Up
              </Button>
            </Typography>
          ) : (
            <Typography variant="body2">
              Already have an account?{' '}
              <Button
                onClick={() => setIsLogin(true)}
                sx={{ color: '#e91e63', textTransform: 'none', fontWeight: 600 }}
              >
                Log In
              </Button>
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary" mt={1}>
            By continuing, you agree to our Terms of <br />Service and Privacy Policy.
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}