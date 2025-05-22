import React, { useEffect, useState } from 'react';
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
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  fetchEventsStart,
  fetchEventsSuccess,
  fetchEventsFailure,
} from '../../store/slices/eventSlice';
import { eventAPI } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

const EventList: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state: RootState) => state.event);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    search: '',
  });

  useEffect(() => {
    const fetchEvents = async () => {
      dispatch(fetchEventsStart());
      try {
        const response = await eventAPI.getEvents(filters);
        dispatch(fetchEventsSuccess(response.data));
      } catch (err: any) {
        dispatch(fetchEventsFailure(err.response?.data?.message || 'Failed to fetch events'));
      }
    };

    fetchEvents();
  }, [dispatch, filters]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Events
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/events/create')}
        >
          Create Event
        </Button>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              label="Search Events"
              name="search"
              value={filters.search}
              onChange={handleFilterChange}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select
                name="type"
                value={filters.type}
                label="Event Type"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All Types</MenuItem>
                <MenuItem value="WORKSHOP">Workshop</MenuItem>
                <MenuItem value="SEMINAR">Seminar</MenuItem>
                <MenuItem value="NETWORKING">Networking</MenuItem>
                <MenuItem value="CULTURAL">Cultural</MenuItem>
                <MenuItem value="EDUCATIONAL">Educational</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                name="status"
                value={filters.status}
                label="Status"
                onChange={handleFilterChange}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="UPCOMING">Upcoming</MenuItem>
                <MenuItem value="ONGOING">Ongoing</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {event.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Chip
                    label={event.type}
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Chip
                    label={event.status}
                    color="secondary"
                    size="small"
                  />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {new Date(event.startTime).toLocaleDateString()} - {new Date(event.endTime).toLocaleDateString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.location}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  View Details
                </Button>
                <Button
                  size="small"
                  color="primary"
                  onClick={() => navigate(`/events/${event.id}/register`)}
                >
                  Register
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EventList; 