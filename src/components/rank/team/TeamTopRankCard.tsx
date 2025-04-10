'use client';

import Image from 'next/image';
import { TeamWithPoints } from '@/types/rank.type';

type Props = {
  team: TeamWithPoints;
  rank: number;
  onClick?: () => void;
};

export const TopRankTeamCard = ({ team, rank, onClick }: Props) => {
  return (
    <article
      onClick={onClick}
      className="border rounded-3xl p-4 shadow-md bg-gray-100 w-54 h-64 flex flex-col items-center justify-center"
    >
      <h2 className="text-xl font-bold text-gray-700 mb-2">
        {rank}
        {rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}
      </h2>
      <div className="w-28 h-28 bg-gray-300 rounded-lg flex items-center justify-center mb-2">
        <Image
          src="/images/default-emblem.png"
          alt={team.teamName ?? 'Team'}
          width={112}
          height={112}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-600">Lv. 1</p>
        <h3 className="text-xl font-bold text-gray-700">{team.teamName}</h3>
        <p>
          {team.memberCount}/{team.maxTeamSize}
        </p>
        <p className="text-gray-600">{team.teamBio}</p>
      </div>
    </article>
  );
};
