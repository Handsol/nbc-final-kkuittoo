'use client';

import { TeamWithPoints } from '@/types/rank.type';
import { NormalTeamRankLabel } from './NormalTeamRankLabel';
import { NormalTeamEmblem } from './NormalTeamEmblem';
import { NormalTeamInfo } from './NormalTeamInfo';
import TeamJoin from '@/components/team/TeamJoin';

type Props = {
  team: TeamWithPoints;
  rank: number;
  hasTeam: boolean;
};

export const NormalRankTeamCard = ({ team, rank, hasTeam }: Props) => {
  const currentMembers = team.memberCount;
  return (
    <>
      <article className="border rounded-3xl p-4 shadow-md bg-sub-light w-full h-24 flex items-center justify-between overflow-hidden">
        {/* 왼쪽 정보 그룹 */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <NormalTeamRankLabel rank={rank} />
          <NormalTeamEmblem teamName={team.teamName} embluem={team.emblem} />
          <NormalTeamInfo team={team} />
        </div>

        {/* 오른쪽 버튼 영역 */}
        <div className="shrink-0 ml-2">
          <TeamJoin
            team={team}
            hasTeam={hasTeam}
            currentMembers={currentMembers}
          />
        </div>
      </article>
    </>
  );
};
