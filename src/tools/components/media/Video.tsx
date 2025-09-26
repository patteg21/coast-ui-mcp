import React from 'react';
import { VideoProps } from '../types.js';

export const Video: React.FC<VideoProps> = ({
  src,
  poster,
  controls = true,
}) => {
  return (
    <video
      src={src}
      poster={poster}
      controls={controls}
      className="w-full rounded-lg shadow-md"
    >
      Your browser does not support the video tag.
    </video>
  );
};