import React, { useState } from "react";
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
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
   //auth
    navigate("/dashboard");
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
              {isLogin ? "Welcome Back" : "Create an Account"}
            </Typography>
          }
          subheader={
            <Typography variant="body2" align="center">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Sign up to get started"}
            </Typography>
          }
        />
        <CardContent>
          <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            {!isLogin && (
              <Box mb={2}>
                <Typography variant="body2" fontWeight="medium">
                  Full Name
                </Typography>
                <Input fullWidth placeholder="Enter your full name" />
              </Box>
            )}
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
            <Button variant="contained" fullWidth type="submit">
              {isLogin ? "Sign In" : "Sign Up"}
            </Button>
            <Box textAlign="center" mt={2}>
              <Typography variant="body2">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <Button
                  variant="text"
                  onClick={() => setIsLogin(!isLogin)}
                  size="small"
                >
                  {isLogin ? "Sign Up" : "Login"}
                </Button>
              </Typography>
            </Box>
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