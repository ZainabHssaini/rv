import { useState } from 'react';

interface MeetButtonProps {
  meetLink: string;
  className?: string;
}

const MeetButton = ({ meetLink, className }: MeetButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinMeeting = () => {
    setIsLoading(true);
    // You could add analytics or other logic here
    window.open(meetLink, '_blank');
    setIsLoading(false);
  };

  return (
    <button
      onClick={handleJoinMeeting}
      disabled={isLoading}
      className={`px-4 py-2 bg-reviva-teal text-white rounded-lg font-medium mt-2 ${className}`}
    >
      {isLoading ? 'Joining...' : 'Join Group'}
    </button>
  );
};

export default MeetButton;