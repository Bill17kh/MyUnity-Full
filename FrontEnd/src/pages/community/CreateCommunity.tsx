import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  MenuItem,
  Grid,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import {
  createCommunityStart,
  createCommunitySuccess,
  createCommunityFailure,
} from '../../store/slices/communitySlice';
import { communityAPI } from '../../services/api';
import ErrorMessage from '../../components/common/ErrorMessage';

const communityTypes = [
  { value: 'ARAB', label: 'Arab Community' },
  { value: 'AFRICAN', label: 'African Community' },
  { value: 'REFUGEE', label: 'Refugee Support' },
  { value: 'DISABLED', label: 'Disabled Support' },
  { value: 'STUDENT', label: 'Student Community' },
  { value: 'CULTURAL', label: 'Cultural Exchange' },
  { value: 'IMMIGRATION', label: 'Immigration Support' },
  { value: 'JOB', label: 'Job Seekers' },
];

const languages = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'العربية' },
  { value: 'fr', label: 'Français' },
];

const CreateCommunity: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    type: '',
    language: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    dispatch(createCommunityStart());

    try {
      const response = await communityAPI.createCommunity(formData);
      dispatch(createCommunitySuccess(response.data));
      navigate(`/community/${response.data.id}`);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create community';
      setError(errorMessage);
      dispatch(createCommunityFailure(errorMessage));
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create New Community
        </Typography>

        {error && <ErrorMessage message={error} />}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Community Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Community Type"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                {communityTypes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Primary Language"
                name="language"
                value={formData.language}
                onChange={handleChange}
              >
                {languages.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/community')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Create Community
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateCommunity; 