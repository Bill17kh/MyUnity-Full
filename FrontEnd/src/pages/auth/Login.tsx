import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Sign in to continue to RightHand
          </Typography>
        </Box>

        <LoginForm />

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Don't have an account?{' '}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/register')}
            >
              Sign up
            </Typography>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login; 