import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  fetchCommunitiesStart,
  fetchCommunitiesSuccess,
  fetchCommunitiesFailure,
} from '../../store/slices/communitySlice';
import { communityAPI } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const CommunityList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { communities, loading, error } = useSelector(
    (state: RootState) => state.community
  );

  useEffect(() => {
    const fetchCommunities = async () => {
      dispatch(fetchCommunitiesStart());
      try {
        const response = await communityAPI.getCommunities();
        dispatch(fetchCommunitiesSuccess(response.data));
      } catch (err: any) {
        dispatch(fetchCommunitiesFailure(err.response?.data?.message || 'Failed to fetch communities'));
      }
    };

    fetchCommunities();
  }, [dispatch]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Communities
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/community/create')}
        >
          Create Community
        </Button>
      </Box>

      <Grid container spacing={3}>
        {communities.map((community) => (
          <Grid item xs={12} sm={6} md={4} key={community.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {community.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {community.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={community.type}
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={community.language}
                    color="secondary"
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {community.memberCount} members
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/community/${community.id}`)}
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/community/${community.id}/join`)}
                >
                  Join Community
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default CommunityList; 