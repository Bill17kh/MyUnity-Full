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
  fetchEventStart,
  fetchEventSuccess,
  fetchEventFailure,
  setCurrentEvent,
} from '../../store/slices/eventSlice';
import { eventAPI } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const EventDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentEvent: event, loading, error } = useSelector(
    (state: RootState) => state.event
  );

  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      
      dispatch(fetchEventStart());
      try {
        const response = await eventAPI.getEvent(id);
        dispatch(setCurrentEvent(response.data));
      } catch (err: any) {
        dispatch(fetchEventFailure(err.response?.data?.message || 'Failed to fetch event'));
      }
    };

    fetchEvent();
  }, [dispatch, id]);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!event) return <ErrorMessage message="Event not found" />;

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {event.title}
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Chip
            label={event.type}
            color="primary"
            sx={{ mr: 1 }}
          />
          <Chip
            label={event.status}
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
              {event.description}
            </Typography>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Event Details
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Date & Time"
                  secondary={`${new Date(event.startTime).toLocaleString()} - ${new Date(event.endTime).toLocaleString()}`}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Location"
                  secondary={event.location}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Organizer"
                  secondary={event.organizer}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Event Stats
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Registered Participants"
                  secondary={event.registeredCount}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Capacity"
                  secondary={event.capacity}
                />
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Status"
                  secondary={event.status}
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
                onClick={() => navigate(`/events/${id}/register`)}
                disabled={event.status === 'COMPLETED' || event.registeredCount >= event.capacity}
              >
                Register for Event
              </Button>
              <Button
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => navigate(`/events/${id}/share`)}
              >
                Share Event
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDetail; 