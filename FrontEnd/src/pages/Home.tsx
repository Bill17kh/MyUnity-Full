import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const features = [
    {
      title: 'Community Hubs',
      description: 'Connect with others in your community, share experiences, and find support.',
      path: '/community',
    },
    {
      title: 'Events',
      description: 'Discover cultural events, workshops, and community gatherings near you.',
      path: '/events',
    },
    {
      title: 'Help Exchange',
      description: 'Offer or request help with various needs in your community.',
      path: '/help',
    },
  ];

  return (
    <Container>
      <Box sx={{ textAlign: 'center', my: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Welcome to MyUnity
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Empowering minority communities through connection, support, and growth
        </Typography>
        {!isAuthenticated && (
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/register')}
              sx={{ mr: 2 }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          </Box>
        )}
      </Box>

      <Grid container spacing={4} sx={{ mt: 4 }}>
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.title}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {feature.title}
                </Typography>
                <Typography>
                  {feature.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(feature.path)}
                >
                  Learn More
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Why Choose MyUnity?
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          MyUnity provides a safe, supportive platform for minority communities to connect,
          share resources, and grow together. Our features are designed to address the unique
          needs of our diverse user base.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home; 