'use client';

import { TeamWithPoints } from '@/types/rank.type';
import { useState } from 'react';
import { CommonModal } from '@/components/common/CommonModal';
import { TeamDetailModal } from '../TeamDetailModalContents';
import { TeamRankLabel } from './TopTeamRankLabel';
import { TeamEmblem } from './TopTeamEmblem';
import { TeamRankInfo } from './TopTeamInfo';
import TeamJoin from '@/components/team/TeamJoin';

type Props = {
  team: TeamWithPoints;
  rank: number;
  hasTeam: boolean;
};

export const TopRankTeamCard = ({ team, rank, hasTeam }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentMembers = team.memberCount;
  return (
    <>
      <article className="border rounded-3xl p-4 shadow-md bg-gray-100 w-54 h-64 flex flex-col items-center justify-center">
        {/* 클릭시 모달이 열리는 영역 */}
        <div
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <TeamRankLabel rank={rank} />
          <TeamEmblem teamName={team.teamName} />
          <TeamRankInfo team={team} />
        </div>
        {/* 팀 가입 버튼 */}
        <TeamJoin
          team={team}
          hasTeam={hasTeam}
          currentMembers={currentMembers}
        />
      </article>

      <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TeamDetailModal team={team} onClose={() => setIsModalOpen(false)} />
      </CommonModal>
    </>
  );
};
