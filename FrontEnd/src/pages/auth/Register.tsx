import React from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';

const Register: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Join RightHand and start making a difference
          </Typography>
        </Box>

        <RegisterForm />

        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            Already have an account?{' '}
            <Typography
              component="span"
              color="primary"
              sx={{ cursor: 'pointer' }}
              onClick={() => navigate('/login')}
            >
              Sign in
            </Typography>
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Register; 