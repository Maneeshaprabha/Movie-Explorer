import React from "react";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Input,
  Box,
} from "@mui/material";
import { useNavigate } from 'react-router-dom';
export function LoginForm() {
  

    const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault(); 
   
    navigate('/dashboard'); 
  };
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
    >
      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          boxShadow: 3,
          backdropFilter: "blur(6px)",
          backgroundColor: "rgba(255,255,255,0.6)",
        }}
      >
        <CardHeader
          title={
            <Typography variant="h5" align="center" fontWeight="bold">
              Welcome Back
            </Typography>
          }
          subheader={
            <Typography variant="body2" align="center">
              Enter your credentials to access your account
            </Typography>
          }
        />
        <CardContent>
          <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
            <Box mb={2}>
              <Typography variant="body2" fontWeight="medium">
                Username
              </Typography>
              <Input fullWidth placeholder="Enter your username" />
            </Box>
            <Box mb={3}>
              <Typography variant="body2" fontWeight="medium">
                Password
              </Typography>
              <Input fullWidth type="password" placeholder="••••••••" />
            </Box>
               <Button variant="contained" fullWidth type="submit" onClick={handleSignIn}>
      Sign In
    </Button>

          </Box>
        </CardContent>
        <Box textAlign="center" py={2}>
          <Typography variant="caption" color="text.secondary">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Typography>
        </Box>
      </Card>
    </Box>
  );
}
