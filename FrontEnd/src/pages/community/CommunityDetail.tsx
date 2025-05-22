import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  fetchCommunitiesStart,
  fetchCommunitiesSuccess,
  fetchCommunitiesFailure,
  setCurrentCommunity,
} from '../../store/slices/communitySlice';
import { communityAPI } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const CommunityDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentCommunity: community, loading, error } = useSelector(
    (state: RootState) => state.community
  );

  useEffect(() => {
    const fetchCommunity = async () => {
      if (!id) return;
      
      dispatch(fetchCommunitiesStart());
      try {
        const response = await communityAPI.getCommunity(id);
        dispatch(setCurrentCommunity(response.data));
      } catch (err: any) {
        dispatch(fetchCommunitiesFailure(err.response?.data?.message || 'Failed to fetch community'));
      }
    };

    fetchCommunity();
  }, [dispatch, id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!community) return <ErrorMessage message="Community not found" />;

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {community.name}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Chip
            label={community.type}
            color="primary"
            sx={{ mr: 1 }}
          />
          <Chip
            label={community.language}
            color="secondary"
          />
        </Box>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              About
            </Typography>
            <Typography variant="body1" paragraph>
              {community.description}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Upcoming Events
            </Typography>
            <List>
              {/* TODO: Add events list */}
              <ListItem>
                <ListItemText
                  primary="No upcoming events"
                  secondary="Check back later for community events"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Community Stats
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Members"
                  secondary={community.memberCount}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Status"
                  secondary={community.isActive ? 'Active' : 'Inactive'}
                />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Actions
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => navigate(`/community/${id}/events/create`)}
              >
                Create Event
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => navigate(`/community/${id}/help/create`)}
              >
                Request Help
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CommunityDetail; 