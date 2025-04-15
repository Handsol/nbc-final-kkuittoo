'use client';

import { TeamWithPoints } from '@/types/rank.type';
import { useState } from 'react';
import { CommonModal } from '@/components/common/CommonModal';
import { TeamDetailModal } from '../TeamDetailModalContents';
import { TeamRankLabel } from './TopTeamRankLabel';
import { TeamEmblem } from './TopTeamEmblem';
import { TeamRankInfo } from './TopTeamInfo';
import TeamJoin from '@/components/team/TeamJoin';
import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';

type Props = {
  team: TeamWithPoints;
  rank: number;
  hasTeam: boolean;
};

export const TopRankTeamCard = ({ team, rank, hasTeam }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const currentMembers = team.memberCount;
  // 랭킹에 따라 포디움 크기와 상단면 크기 동적 설정
  const podiumSize =
    rank === 1
      ? { width: 'w-44', height: 'h-56' }
      : { width: 'w-32', height: 'h-44' };
  const topFaceOffset = rank === 1 ? '-mt-10' : '-mt-8';
  const topFaceHeight = rank === 1 ? 'h-8' : 'h-6';

  return (
    <>
      <article className="flex flex-col items-center">
        {/* 유저 정보 영역 */}
        <div className="flex flex-col items-center mb-2">
          <TeamEmblem teamName={team.teamName} />
          <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>
            {team.teamName}
          </UserTitle>
          <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>Lv.1</UserTitle>
        </div>

        {/* 포디움 영역 */}
        <div
          className={`relative ${podiumSize.width} ${podiumSize.height} rounded-t-md bg-gradient-to-b from-violet-500 to-white flex items-center justify-center`}
        >
          {/* 기울어진 상단면 컨테이너 */}
          <div
            className="absolute top-0 left-0 w-full"
            style={{ perspective: '600px' }} // 상단면에만 원근법 적용
          >
            <div
              className={`p-6 w-full ${topFaceHeight} ${topFaceOffset} bg-violet-300 rounded-t-md`}
              style={{
                transform: 'rotateX(70deg)', // 3D 효과를 위한 회전
                transformOrigin: 'bottom',
                backfaceVisibility: 'hidden',
              }}
            />
          </div>
          <span className="text-4xl font-bold text-white z-10">{rank}</span>
        </div>

        {/* 참여하기 버튼 */}
        <div className="mt-2">
          <TeamJoin
            team={team}
            hasTeam={hasTeam}
            currentMembers={currentMembers}
          />
        </div>
      </article>

      <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <TeamDetailModal team={team} onClose={() => setIsModalOpen(false)} />
      </CommonModal>
    </>
  );
};
