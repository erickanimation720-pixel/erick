
import React, { useState, useEffect, useCallback } from 'react';
import { GoogleGenAI } from '@google/genai';
import type { VideosOperationResponse, GenerateVideosOperationResponse } from '@google/genai';
import { ApiKeySelector } from './components/ApiKeySelector';
import { VideoForm } from './components/VideoForm';
import { StatusDisplay } from './components/StatusDisplay';
import { VideoPreview } from './components/VideoPreview';

// Declare aistudio property on window
declare global {
  interface Window {
    aistudio?: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const App: React.FC = () => {
  const [hasApiKey, setHasApiKey] = useState(false);
  const [projectName, setProjectName] = useState('Kids of Kakuma Adventure');
  const [title, setTitle] = useState('');
  const [language, setLanguage] = useState<'sw' | 'en'>('sw');
  const [voiceGender, setVoiceGender] = useState('Female');
  const [script, setScript] = useState('Scene 1: Children gather and dance under the baobab tree in Kakuma camp.');

  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState('');
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const checkApiKey = useCallback(async () => {
    if (window.aistudio) {
      const keySelected = await window.aistudio.hasSelectedApiKey();
      setHasApiKey(keySelected);
    }
  }, []);

  useEffect(() => {
    checkApiKey();
  }, [checkApiKey]);

  const handleSelectApiKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success after opening dialog to handle race condition
      setHasApiKey(true);
    }
  };

  const handleGenerateVideo = async () => {
    if (!script.trim()) {
      setStatus('Please enter a script for the scene.');
      return;
    }

    setIsLoading(true);
    setVideoUrl(null);
    setStatus('Initializing VEO Studio... 🚀');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      setStatus('Sending your script to the animation studio... ✨');
      
      let operation: GenerateVideosOperationResponse | VideosOperationResponse = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: script,
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9',
        }
      });

      setStatus('Our digital artists are bringing your characters to life... 🎨 (This can take a few minutes)');

      let pollCount = 0;
      while (!operation.done) {
        pollCount++;
        await new Promise(resolve => setTimeout(resolve, 10000));
        setStatus(`Checking on the animation progress... 🏃‍♂️ (Attempt ${pollCount})`);
        operation = await ai.operations.getVideosOperation({ operation: operation as GenerateVideosOperationResponse });
      }
      
      setStatus('Finalizing your cartoon masterpiece... 🎬');

      if (operation.response?.generatedVideos?.[0]?.video?.uri) {
        const downloadLink = operation.response.generatedVideos[0].video.uri;
        const finalUrl = `${downloadLink}&key=${process.env.API_KEY}`;
        setVideoUrl(finalUrl);
        setStatus('Hooray! Your video is ready! 🎉');
      } else {
        throw new Error('Video generation finished, but no video URI was found.');
      }
    } catch (error: any) {
      console.error(error);
      let errorMessage = 'An unexpected error occurred. Please try again.';
      if (error.message.includes('Requested entity was not found')) {
        errorMessage = 'Your API key is invalid. Please select a valid key.';
        setHasApiKey(false);
      } else if (error.message) {
        errorMessage = `Error: ${error.message}`;
      }
      setStatus(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasApiKey) {
    return <ApiKeySelector onSelectApiKey={handleSelectApiKey} />;
  }

  return (
    <div className="min-h-screen flex flex-col justify-between p-4">
      <main className="max-w-3xl w-full mx-auto bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl p-6 my-10 border border-white">
        <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-emerald-700">
            🌍 KakumaVEO Studio
            </h1>
            <p className="text-gray-600 mt-1">Kids Cartoon Maker</p>
        </div>

        <VideoForm
          projectName={projectName}
          setProjectName={setProjectName}
          title={title}
          setTitle={setTitle}
          language={language}
          setLanguage={setLanguage}
          voiceGender={voiceGender}
          setVoiceGender={setVoiceGender}
          script={script}
          setScript={setScript}
          onGenerate={handleGenerateVideo}
          isLoading={isLoading}
        />

        <StatusDisplay status={status} isLoading={isLoading} />
        {videoUrl && <VideoPreview videoUrl={videoUrl} />}
      </main>

      <footer className="text-center text-sm text-gray-600 mb-4">
        Developed with ❤️ by <strong>DJ Erick Nzika</strong> – KakumaVEO Studios, Kenya
      </footer>
    </div>
  );
};

export default App;
