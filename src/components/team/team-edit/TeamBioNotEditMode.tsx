import Text from '@/components/common/Text';
import React from 'react';

type TeamBioNotEditModeProps = {
  teamBio: string;
};

const TeamBioNotEditMode = ({ teamBio }: TeamBioNotEditModeProps) => {
  return (
    <div className="w-full h-50">
      <Text>{teamBio}</Text>
    </div>
  );
};

export default TeamBioNotEditMode;
