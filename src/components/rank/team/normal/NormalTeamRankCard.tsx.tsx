'use client';

import { TeamWithPoints } from '@/types/rank.type';
import { NormalTeamRankLabel } from './NormalTeamRankLabel';
import { NormalTeamEmblem } from './NormalTeamEmblem';
import { NormalTeamInfo } from './NormalTeamInfo';
import TeamJoin from '@/components/team/TeamJoin';
import TeamOpenNotEditMode from '@/components/team/team-edit/TeamOpenNotEditMode';

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
          <div className="hidden md:block">
            <NormalTeamEmblem teamName={team.teamName} embluem={team.emblem} />
          </div>
          <NormalTeamInfo team={team} />
        </div>

        {/* 오른쪽 버튼 영역 */}
        <div className="flex items-center gap-2 shrink-0 ml-2">
          {hasTeam === false && (
            <TeamJoin
              team={team}
              hasTeam={hasTeam}
              currentMembers={currentMembers}
            />
          )}
          {/* 항상 아이콘은 존재 */}
          <TeamOpenNotEditMode isOpened={team.isOpened} />
        </div>
      </article>
    </>
  );
};
