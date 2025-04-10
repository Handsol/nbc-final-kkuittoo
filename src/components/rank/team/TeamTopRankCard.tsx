'use client';

import Image from 'next/image';
import { TeamWithPoints } from '@/types/rank.type';
import Title from '@/components/common/Title';
import { TITLE_MODE, USER_TITLE_MODE } from '@/constants/mode.constants';
import UserTitle from '@/components/common/UserTitle';

type Props = {
  team: TeamWithPoints;
  rank: number;
  onClick?: () => void;
};

export const TopRankTeamCard = ({ team, rank, onClick }: Props) => {
  return (
    <article
      onClick={onClick}
      className="border rounded-3xl p-4 shadow-md bg-gray-100 w-54 h-64 flex flex-col items-center justify-center"
    >
      {/* 랭킹 표시 */}
      <Title
        mode={TITLE_MODE.SECTION_TITLE}
        className="text-xl font-bold text-gray-700 mb-2"
      >
        {rank}
        {rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}
      </Title>

      {/* 사용자 이미지 */}
      <figure className="w-28 h-28 bg-gray-300 rounded-lg flex items-center justify-center mb-2">
        <Image
          src="/images/default-emblem.png"
          alt={team.teamName ?? 'Team'}
          width={112}
          height={112}
          className="object-cover rounded-lg"
        />
      </figure>

      {/* 사용자 정보 (레벨, 이름, 소개) */}
      <section className="text-center">
        <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>Lv. 1</UserTitle>
        <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{team.teamName}</UserTitle>
        <p>
          {team.memberCount}/{team.maxTeamSize}
        </p>
        <p className="text-gray-600">{team.teamBio}</p>
      </section>
    </article>
  );
};
