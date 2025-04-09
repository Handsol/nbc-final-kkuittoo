import Text from '@/components/common/Text';
import React from 'react';

type TeamBioNotEditModeProps = {
  teamBio: string;
};

const TeamBioNotEditMode = ({ teamBio }: TeamBioNotEditModeProps) => {
  return <Text>{teamBio}</Text>;
};

export default TeamBioNotEditMode;
