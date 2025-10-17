
import React from 'react';

interface ApiKeySelectorProps {
  onSelectApiKey: () => void;
}

export const ApiKeySelector: React.FC<ApiKeySelectorProps> = ({ onSelectApiKey }) => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-8 border border-white text-center">
        <h2 className="text-2xl font-bold text-emerald-700 mb-4">Welcome to KakumaVEO Studio!</h2>
        <p className="text-gray-600 mb-6">
          To start creating amazing videos, please select your Google AI API key. This is required to use the VEO video generation model.
        </p>
        <button
          onClick={onSelectApiKey}
          className="bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-6 rounded-lg font-semibold transition w-full text-lg"
        >
          🔑 Select API Key
        </button>
        <p className="text-xs text-gray-500 mt-4">
          Need help? Visit the{' '}
          <a
            href="https://ai.google.dev/gemini-api/docs/billing"
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 hover:underline"
          >
            billing documentation
          </a>{' '}
          for more information.
        </p>
      </div>
    </div>
  );
};
