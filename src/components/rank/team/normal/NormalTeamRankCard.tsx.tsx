'use client';

import { TeamWithPoints } from '@/types/rank.type';
import { NormalTeamRankLabel } from './NormalTeamRankLabel';
import { NormalTeamEmblem } from './NormalTeamEmblem';
import { NormalTeamInfo } from './NormalTeamInfo';
import Link from 'next/link';
import { PATH } from '@/constants/path.constants';
import CommonTooltip from '@/components/common/CommonTooltip';
import { TOOLTIP_MESSAGE } from '@/constants/tooltip-message.constants';

type Props = {
  team: TeamWithPoints;
  rank: number;
};

export const NormalRankTeamCard = ({ team, rank }: Props) => {
  const teamId = team.id;
  return (
    <CommonTooltip message={TOOLTIP_MESSAGE.RANK.TEAM_CARD}>
      <Link href={`${PATH.TEAM}/${teamId}`}>
        <article className="border rounded-3xl p-4 shadow-md bg-sub-light w-full h-24 flex items-center justify-between overflow-hidden cursor-pointer hover:scale-[1.03] duration-200">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <NormalTeamRankLabel rank={rank} />
            <NormalTeamEmblem teamName={team.teamName} embluem={team.emblem} />
            <NormalTeamInfo team={team} />
          </div>
        </article>
      </Link>
    </CommonTooltip>
  );
};
