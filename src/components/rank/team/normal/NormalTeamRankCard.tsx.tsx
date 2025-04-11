'use client';

import { TeamWithPoints } from '@/types/rank.type';
import { useState } from 'react';
import { CommonModal } from '@/components/common/CommonModal';
import { TeamDetailModal } from '../TeamDetailModalContents';
import { NormalTeamRankLabel } from './NormalTeamRankLabel';
import { NormalTeamEmblem } from './NormalTeamEmblem';
import { NormalTeamInfo } from './NormalTeamInfo';

type Props = {
  team: TeamWithPoints;
  rank: number;
};

export const NormalRankTeamCard = ({ team, rank }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <article
        onClick={() => setIsModalOpen(true)}
        className="border rounded-3xl p-4 shadow-md bg-gray-100 w-full h-24 flex items-center"
      >
        <NormalTeamRankLabel rank={rank} />
        <NormalTeamEmblem teamName={team.teamName} />
        <NormalTeamInfo team={team} />
      </article>

      <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TeamDetailModal team={team} onClose={() => setIsModalOpen(false)} />
      </CommonModal>
    </>
  );
};
