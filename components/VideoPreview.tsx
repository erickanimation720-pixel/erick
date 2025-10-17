
import React from 'react';

interface VideoPreviewProps {
  videoUrl: string;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({ videoUrl }) => {
  return (
    <div className="mt-6 text-center">
      <video controls width="100%" className="rounded-xl shadow-lg border-2 border-emerald-200" key={videoUrl}>
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <a
        href={videoUrl}
        download="kakuma-veo-demo.mp4"
        className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg font-semibold transition"
      >
        ⬇️ Download Demo Video
      </a>
    </div>
  );
};
