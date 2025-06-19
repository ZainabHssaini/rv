import React, { useState, useRef } from 'react';
import { Play, Pause, Volume2 } from 'lucide-react';
import { toast } from 'sonner';

interface AudioPlayerComponentProps {
  audioText: string;
  label: string;
  audioUrl?: string;
}

const AudioPlayerComponent: React.FC<AudioPlayerComponentProps> = ({ 
  audioText, 
  label,
  audioUrl = '/audio/darija-message.mp3' // default audio file path
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (!isPlaying) {
        setIsLoading(true);
        await audioRef.current.play();
        setIsPlaying(true);
        toast.info('Audio playback started');
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
        toast.info('Playback stopped');
      }
    } catch (error) {
      console.error('Error playing audio:', error);
      toast.error('Error playing audio file');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    toast.success('Playback finished');
  };

  const handleAudioError = () => {
    setIsLoading(false);
    setIsPlaying(false);
    toast.error('Audio file not found. Please add the audio file to public/audio/');
  };

  return (
    <div className="inline-flex items-center gap-3 p-4 bg-reviva-mint/20 dark:bg-reviva-teal/10 rounded-xl">
      <audio
        ref={audioRef}
        src={audioUrl}
        onEnded={handleAudioEnd}
        onError={handleAudioError}
        preload="metadata"
      />
      
      <button 
        onClick={handlePlay}
        disabled={isLoading}
        className={`p-3 rounded-full transition-colors ${
          isPlaying 
            ? 'bg-reviva-deep-teal text-white' 
            : 'bg-reviva-teal text-white hover:bg-reviva-deep-teal'
        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isLoading ? (
          <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : isPlaying ? (
          <Pause className="h-5 w-5" />
        ) : (
          <Play className="h-5 w-5" />
        )}
      </button>
      
      <div className="flex items-center gap-2">
        <Volume2 className="h-4 w-4 text-reviva-teal" />
        <span className="text-sm text-reviva-charcoal dark:text-white">
          {label}
        </span>
      </div>
      
      {isPlaying && (
        <div className="flex space-x-1">
          <div className="w-1 h-4 bg-reviva-teal rounded-full animate-pulse"></div>
          <div className="w-1 h-4 bg-reviva-teal rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1 h-4 bg-reviva-teal rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayerComponent;
