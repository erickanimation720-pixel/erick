
import React from 'react';

interface StatusDisplayProps {
  status: string;
  isLoading: boolean;
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, isLoading }) => {
  if (!status) return null;

  return (
    <div className="mt-6 text-center text-gray-600 bg-gray-50 p-4 rounded-lg border border-gray-200">
      {isLoading && (
        <div className="flex items-center justify-center mb-2">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-emerald-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
        </div>
      )}
      <p className="font-medium text-emerald-800">{status}</p>
    </div>
  );
};
