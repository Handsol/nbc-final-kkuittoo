'use client';

import Image from 'next/image';
import { TeamWithPoints } from '@/types/rank.type';

type Props = {
  team: TeamWithPoints;
  rank: number;
  onClick?: () => void;
};

export const NormalRankTeamCard = ({ team, rank, onClick }: Props) => {
  return (
    <div
      onClick={onClick}
      className="border rounded-3xl p-4 shadow-md bg-gray-100 w-full h-24 flex items-center"
    >
      <h2 className="text-xl font-bold text-gray-700 mr-4">
        {rank}
        {rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}
      </h2>
      <div className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mr-4">
        <Image
          src="/images/default-emblem.png"
          alt={team.teamName ?? 'Team'}
          width={64}
          height={64}
          className="object-cover rounded-lg"
        />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-600">Lv. 1</p>
        <h3 className="text-xl font-bold text-gray-700">{team.teamName}</h3>
        <p>
          {team.memberCount}/{team.maxTeamSize}
        </p>
        <p className="text-gray-600 truncate">{team.teamBio}</p>
      </div>
    </div>
  );
};
