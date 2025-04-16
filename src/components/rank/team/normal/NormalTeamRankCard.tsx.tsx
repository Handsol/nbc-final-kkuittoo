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
      <article className="border rounded-3xl p-4 shadow-md bg-sub-light w-full h-24 flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer">
          <div className="flex items-center gap-3">
            <NormalTeamRankLabel rank={rank} />
            <NormalTeamEmblem teamName={team.teamName} embluem={team.emblem} />
          </div>
          <NormalTeamInfo team={team} />
        </div>
        {/* 팀 가입 버튼 */}
        <TeamJoin
          team={team}
          hasTeam={hasTeam}
          currentMembers={currentMembers}
        />
      </article>
    </>
  );
};
