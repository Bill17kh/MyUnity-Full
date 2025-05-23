import React from 'react';
import CommunityCard from './CommunityCard';
import { COMMUNITY_TYPES } from '../../utils/constants';

interface Community {
  id: string;
  name: string;
  description: string;
  type: keyof typeof COMMUNITY_TYPES;
  memberCount: number;
  createdAt: string;
  imageUrl?: string;
}

interface CommunityListProps {
  communities: Community[];
  isLoading?: boolean;
  error?: string;
}

const CommunityList: React.FC<CommunityListProps> = ({
  communities,
  isLoading = false,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-4 animate-pulse"
          >
            <div className="h-48 bg-gray-200 rounded mb-4"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (communities.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No communities found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {communities.map((community) => (
        <CommunityCard key={community.id} {...community} />
      ))}
    </div>
  );
};

export default CommunityList; 