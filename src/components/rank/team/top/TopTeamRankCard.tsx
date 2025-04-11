'use client';

import { TeamWithPoints } from '@/types/rank.type';
import { useState } from 'react';
import { CommonModal } from '@/components/common/CommonModal';
import { TeamDetailModal } from '../TeamDetailModalContents';
import { TeamRankLabel } from './TopTeamRankLabel';
import { TeamEmblem } from './TopTeamEmblem';
import { TeamRankInfo } from './TopTeamInfo';

type Props = {
  team: TeamWithPoints;
  rank: number;
};

export const TopRankTeamCard = ({ team, rank }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <article
        onClick={() => setIsModalOpen(true)}
        className="border rounded-3xl p-4 shadow-md bg-gray-100 w-54 h-64 flex flex-col items-center justify-center"
      >
        <TeamRankLabel rank={rank} />
        <TeamEmblem teamName={team.teamName} />
        <TeamRankInfo team={team} />
      </article>

      <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TeamDetailModal team={team} onClose={() => setIsModalOpen(false)} />
      </CommonModal>
    </>
  );
};
