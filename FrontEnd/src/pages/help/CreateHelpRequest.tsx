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
  createHelpRequestStart,
  createHelpRequestSuccess,
  createHelpRequestFailure,
} from '../../store/slices/helpSlice';
import { helpAPI } from '../../services/api';
import ErrorMessage from '../../components/common/ErrorMessage';

const categories = [
  { value: 'EDUCATION', label: 'Education' },
  { value: 'HOUSING', label: 'Housing' },
  { value: 'EMPLOYMENT', label: 'Employment' },
  { value: 'LEGAL', label: 'Legal' },
  { value: 'HEALTHCARE', label: 'Healthcare' },
  { value: 'TRANSPORTATION', label: 'Transportation' },
  { value: 'LANGUAGE', label: 'Language' },
  { value: 'OTHER', label: 'Other' },
];

const urgencyLevels = [
  { value: 'LOW', label: 'Low' },
  { value: 'MEDIUM', label: 'Medium' },
  { value: 'HIGH', label: 'High' },
  { value: 'URGENT', label: 'Urgent' },
];

const CreateHelpRequest: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    urgencyLevel: '',
    location: '',
    contactInfo: '',
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
    dispatch(createHelpRequestStart());

    try {
      const response = await helpAPI.createHelpRequest(formData);
      dispatch(createHelpRequestSuccess(response.data));
      navigate(`/help/${response.data.id}`);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create help request';
      setError(errorMessage);
      dispatch(createHelpRequestFailure(errorMessage));
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create Help Request
        </Typography>

        {error && <ErrorMessage message={error} />}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Request Title"
                name="title"
                value={formData.title}
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
                helperText="Please provide detailed information about your request"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                select
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((option) => (
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
                label="Urgency Level"
                name="urgencyLevel"
                value={formData.urgencyLevel}
                onChange={handleChange}
              >
                {urgencyLevels.map((option) => (
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
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                helperText="City, State, or Region"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Contact Information"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                helperText="Email or phone number"
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              onClick={() => navigate('/help')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              Create Request
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateHelpRequest; 