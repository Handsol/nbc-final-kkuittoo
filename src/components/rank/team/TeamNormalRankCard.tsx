'use client';

import Image from 'next/image';
import { TeamWithPoints } from '@/types/rank.type';
import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';

type Props = {
  team: TeamWithPoints;
  rank: number;
  onClick?: () => void;
};

export const NormalRankTeamCard = ({ team, rank, onClick }: Props) => {
  return (
    <article
      onClick={onClick}
      className="border rounded-3xl p-4 shadow-md bg-gray-100 w-full h-24 flex items-center"
    >
      {/* 랭킹 표시 */}
      <UserTitle mode={USER_TITLE_MODE.CARD_RANK}>
        {rank}
        {rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}
      </UserTitle>

      {/* 사용자 이미지 */}
      <figure className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mr-4">
        <Image
          src="/images/default-emblem.png"
          alt={team.teamName ?? 'Team'}
          width={64}
          height={64}
          className="object-cover rounded-lg"
        />
      </figure>

      {/* 사용자 정보 (레벨, 이름, 소개...) */}
      <section className="flex-1">
        <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>Lv. 1</UserTitle>
        <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{team.teamName}</UserTitle>
        <p>
          {team.memberCount}/{team.maxTeamSize}
        </p>
        <p className="text-gray-600 truncate">{team.teamBio}</p>
      </section>
    </article>
  );
};
