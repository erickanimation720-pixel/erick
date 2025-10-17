
import React from 'react';

interface VideoFormProps {
  projectName: string;
  setProjectName: (value: string) => void;
  title: string;
  setTitle: (value: string) => void;
  language: 'sw' | 'en';
  setLanguage: (value: 'sw' | 'en') => void;
  voiceGender: string;
  setVoiceGender: (value: string) => void;
  script: string;
  setScript: (value: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

export const VideoForm: React.FC<VideoFormProps> = ({
  projectName,
  setProjectName,
  title,
  setTitle,
  language,
  setLanguage,
  voiceGender,
  setVoiceGender,
  script,
  setScript,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="grid gap-5">
      <div>
        <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
        <input
          id="projectName"
          className="w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition"
          placeholder="e.g., Kids of Kakuma Adventure"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Video Title</label>
        <input
          id="title"
          className="w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition"
          placeholder="Enter video title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => setLanguage('sw')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              language === 'sw' ? 'bg-green-200 text-green-900 ring-2 ring-green-400' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            Kiswahili
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition ${
              language === 'en' ? 'bg-green-200 text-green-900 ring-2 ring-green-400' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            English
          </button>
        </div>
      </div>

      <div>
        <label htmlFor="voiceGender" className="block text-sm font-medium text-gray-700 mb-1">Voice Gender</label>
        <select
          id="voiceGender"
          className="w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition"
          value={voiceGender}
          onChange={(e) => setVoiceGender(e.target.value)}
        >
          <option>Female</option>
          <option>Male</option>
          <option>Child</option>
        </select>
      </div>

      <div>
        <label htmlFor="script" className="block text-sm font-medium text-gray-700 mb-1">Scene Script</label>
        <textarea
          id="script"
          rows={6}
          className="w-full border-gray-300 rounded-lg p-2 shadow-sm focus:ring-emerald-500 focus:border-emerald-500 transition"
          placeholder="Scene 1: Children gather and dance under the baobab tree..."
          value={script}
          onChange={(e) => setScript(e.target.value)}
        ></textarea>
      </div>

      <button
        onClick={onGenerate}
        disabled={isLoading}
        className="bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition text-lg shadow-md hover:shadow-lg"
      >
        {isLoading ? 'Creating Your Cartoon...' : '🎬 Generate Demo Video'}
      </button>
    </div>
  );
};
