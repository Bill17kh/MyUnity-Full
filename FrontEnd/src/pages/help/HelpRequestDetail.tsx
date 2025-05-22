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
  fetchHelpRequestStart,
  fetchHelpRequestSuccess,
  fetchHelpRequestFailure,
  setCurrentHelpRequest,
} from '../../store/slices/helpSlice';
import { helpAPI } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const HelpRequestDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentHelpRequest: request, loading, error } = useSelector(
    (state: RootState) => state.help
  );

  useEffect(() => {
    const fetchHelpRequest = async () => {
      if (!id) return;
      
      dispatch(fetchHelpRequestStart());
      try {
        const response = await helpAPI.getHelpRequest(id);
        dispatch(setCurrentHelpRequest(response.data));
      } catch (err: any) {
        dispatch(fetchHelpRequestFailure(err.response?.data?.message || 'Failed to fetch help request'));
      }
    };

    fetchHelpRequest();
  }, [dispatch, id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!request) return <ErrorMessage message="Help request not found" />;

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {request.title}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Chip
            label={request.category}
            color="primary"
            sx={{ mr: 1 }}
          />
          <Chip
            label={request.status}
            color="secondary"
          />
        </Box>
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Description
            </Typography>
            <Typography variant="body1" paragraph>
              {request.description}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Request Details
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Posted By"
                  secondary={request.requesterName}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Location"
                  secondary={request.location}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Posted Date"
                  secondary={new Date(request.createdAt).toLocaleDateString()}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Urgency Level"
                  secondary={request.urgencyLevel}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Request Status
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Current Status"
                  secondary={request.status}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Offers Received"
                  secondary={request.offersCount}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Last Updated"
                  secondary={new Date(request.updatedAt).toLocaleDateString()}
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
                onClick={() => navigate(`/help/${id}/offer`)}
                disabled={request.status !== 'OPEN'}
              >
                Offer Help
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => navigate(`/help/${id}/share`)}
              >
                Share Request
              </Button>
              {request.requesterId === request.currentUserId && (
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  onClick={() => navigate(`/help/${id}/close`)}
                  disabled={request.status === 'CLOSED'}
                >
                  Close Request
                </Button>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HelpRequestDetail; 