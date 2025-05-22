import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  Tab,
  Tabs,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { fetchUserProfileStart, fetchUserProfileSuccess, fetchUserProfileFailure } from '../../store/slices/authSlice';
import { authAPI } from '../../services/api';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import ErrorMessage from '../../components/common/ErrorMessage';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ProfileView: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state: RootState) => state.auth);
  const [tabValue, setTabValue] = React.useState(0);

  useEffect(() => {
    const fetchProfile = async () => {
      dispatch(fetchUserProfileStart());
      try {
        const response = await authAPI.getUserProfile();
        dispatch(fetchUserProfileSuccess(response.data));
      } catch (err: any) {
        dispatch(fetchUserProfileFailure(err.response?.data?.message || 'Failed to fetch profile'));
      }
    };

    fetchProfile();
  }, [dispatch]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!user) return <ErrorMessage message="User not found" />;

  return (
    <Container>
      <Paper sx={{ p: 4, mt: 4 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                sx={{ width: 120, height: 120, mb: 2 }}
                src={user.avatar}
              >
                {user.displayName?.[0] || user.username?.[0]}
              </Avatar>
              <Typography variant="h5" gutterBottom>
                {user.displayName || user.username}
              </Typography>
              <Typography variant="body1" color="text.secondary" gutterBottom>
                @{user.username}
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => navigate('/profile/edit')}
                sx={{ mt: 2 }}
              >
                Edit Profile
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleTabChange}>
                <Tab label="About" />
                <Tab label="Communities" />
                <Tab label="Events" />
                <Tab label="Help Requests" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Email"
                    secondary={user.email}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Preferred Language"
                    secondary={user.preferredLanguage}
                  />
                </ListItem>
                <Divider />
                <ListItem>
                  <ListItemText
                    primary="Member Since"
                    secondary={new Date(user.createdAt).toLocaleDateString()}
                  />
                </ListItem>
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Typography variant="h6" gutterBottom>
                My Communities
              </Typography>
              <List>
                {user.communities?.map((community) => (
                  <ListItem key={community.id}>
                    <ListItemAvatar>
                      <Avatar>{community.name[0]}</Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={community.name}
                      secondary={community.type}
                    />
                    <Chip
                      label={community.role}
                      color="primary"
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Typography variant="h6" gutterBottom>
                My Events
              </Typography>
              <List>
                {user.events?.map((event) => (
                  <ListItem key={event.id}>
                    <ListItemText
                      primary={event.title}
                      secondary={`${new Date(event.startTime).toLocaleDateString()} - ${event.status}`}
                    />
                    <Chip
                      label={event.type}
                      color="secondary"
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </TabPanel>

            <TabPanel value={tabValue} index={3}>
              <Typography variant="h6" gutterBottom>
                My Help Requests
              </Typography>
              <List>
                {user.helpRequests?.map((request) => (
                  <ListItem key={request.id}>
                    <ListItemText
                      primary={request.title}
                      secondary={`${request.category} - ${request.status}`}
                    />
                    <Chip
                      label={request.urgencyLevel}
                      color="error"
                      size="small"
                    />
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default ProfileView; 