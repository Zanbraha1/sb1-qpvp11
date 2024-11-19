import React from 'react';

interface MediaSectionProps {
  imageSrc: string;
  altText: string;
  position?: 'left' | 'right';
  overlay?: boolean;
}

const MediaSection: React.FC<MediaSectionProps> = ({ 
  imageSrc, 
  altText, 
  position = 'right',
  overlay = false 
}) => {
  return (
    <div className={`relative ${overlay ? 'h-full' : 'h-48 md:h-64'}`}>
      <img
        src={imageSrc}
        alt={altText}
        className={`w-full h-full object-cover rounded-lg ${
          overlay ? 'absolute inset-0' : ''
        }`}
      />
      {overlay && (
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900/80 to-navy-900/40" />
      )}
    </div>
  );
};

export default MediaSection;