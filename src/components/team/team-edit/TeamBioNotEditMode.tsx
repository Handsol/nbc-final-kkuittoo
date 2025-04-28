import Text from '@/components/common/Text';
import React from 'react';

type TeamBioNotEditModeProps = {
  teamBio: string;
};

const TeamBioNotEditMode = ({ teamBio }: TeamBioNotEditModeProps) => {
  return (
    <div className="w-full h-[50px] pl-2 pt-[17px]">
      <Text>{teamBio}</Text>
    </div>
  );
};

export default TeamBioNotEditMode;
