import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate, truncateText } from '../../utils/helpers';
import { COMMUNITY_TYPES } from '../../utils/constants';

interface CommunityCardProps {
  id: string;
  name: string;
  description: string;
  type: keyof typeof COMMUNITY_TYPES;
  memberCount: number;
  createdAt: string;
  imageUrl?: string;
}

const CommunityCard: React.FC<CommunityCardProps> = ({
  id,
  name,
  description,
  type,
  memberCount,
  createdAt,
  imageUrl,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <Link to={`/communities/${id}`}>
        <div className="relative h-48">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-4xl">{name[0]}</span>
            </div>
          )}
          <div className="absolute top-2 right-2">
            <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
              {COMMUNITY_TYPES[type]}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{name}</h3>
          <p className="text-gray-600 mb-4">
            {truncateText(description, 100)}
          </p>
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{memberCount} members</span>
            <span>Created {formatDate(createdAt)}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CommunityCard; 