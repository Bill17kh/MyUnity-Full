import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { COMMUNITY_TYPES } from '../../utils/constants';
import { validateRequired, validateUrl } from '../../utils/validation';

interface CommunityFormProps {
  initialData?: {
    name: string;
    description: string;
    type: keyof typeof COMMUNITY_TYPES;
    imageUrl?: string;
  };
  onSubmit: (data: CommunityFormData) => Promise<void>;
  isSubmitting?: boolean;
}

interface CommunityFormData {
  name: string;
  description: string;
  type: keyof typeof COMMUNITY_TYPES;
  imageUrl?: string;
}

const CommunityForm: React.FC<CommunityFormProps> = ({
  initialData,
  onSubmit,
  isSubmitting = false,
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CommunityFormData>(
    initialData || {
      name: '',
      description: '',
      type: 'CULTURAL',
      imageUrl: '',
    }
  );
  const [errors, setErrors] = useState<Partial<CommunityFormData>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof CommunityFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<CommunityFormData> = {};

    const nameError = validateRequired(formData.name);
    if (nameError) newErrors.name = nameError;

    const descriptionError = validateRequired(formData.description);
    if (descriptionError) newErrors.description = descriptionError;

    if (formData.imageUrl) {
      const imageUrlError = validateUrl(formData.imageUrl);
      if (imageUrlError) newErrors.imageUrl = imageUrlError;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
      navigate('/communities');
    } catch (error) {
      // Error handling is done by the parent component
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Community Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.name ? 'border-red-500' : ''
            }`}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-500">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : ''
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Community Type
          </label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {Object.entries(COMMUNITY_TYPES).map(([key, value]) => (
              <option key={key} value={key}>
                {value}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-sm font-medium text-gray-700"
          >
            Image URL (optional)
          </label>
          <input
            type="url"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
              errors.imageUrl ? 'border-red-500' : ''
            }`}
          />
          {errors.imageUrl && (
            <p className="mt-1 text-sm text-red-500">{errors.imageUrl}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/communities')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isSubmitting ? 'Saving...' : 'Save Community'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommunityForm; 