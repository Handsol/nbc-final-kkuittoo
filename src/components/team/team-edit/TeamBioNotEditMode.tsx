import React from 'react';

type TeamBioNotEditModeProps = {
  teamBio: string;
};

const TeamBioNotEditMode = ({ teamBio }: TeamBioNotEditModeProps) => {
  return <p>{teamBio}</p>;
};

export default TeamBioNotEditMode;
