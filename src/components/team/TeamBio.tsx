'use client';

type TeamBio = {
  teamBio: string;
};

const TeamBio = ({ teamBio }: TeamBio) => {
  return <p>{teamBio}</p>;
};

export default TeamBio;
