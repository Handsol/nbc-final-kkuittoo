import { TITLE_MODE, USER_TITLE_MODE } from '@/constants/mode.constants';
import { UserData } from '@/types/rank.type';
import Title from '@/components/common/Title';
import Image from 'next/image';
import UserTitle from '@/components/common/UserTitle';
import { RankLabel } from '../RankLabel';

type Props = {
  user: UserData;
  rank: number;
};

export const TopRankCard = ({ user, rank }: Props) => {
  return (
    <article className="border rounded-3xl p-4 shadow-md bg-gray-100 w-54 h-64 flex flex-col items-center justify-center">
      {/* 랭킹 표시 */}
      <Title mode={TITLE_MODE.SECTION_TITLE}>
        <RankLabel rank={rank} />
      </Title>
      {/* 사용자 이미지 */}
      <figure className="w-28 h-28 bg-gray-300 rounded-lg flex items-center justify-center">
        <Image
          src={user.image ?? '/images/default.png'}
          alt={user.name ?? '유저 이미지'}
          width={112}
          height={112}
          className="object-cover rounded-lg"
        />
      </figure>

      {/* 사용자 정보 (레벨, 이름, 소개) */}
      <section className="text-center">
        <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>Lv. 1</UserTitle>
        <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{user.name}</UserTitle>
        <p>{user.bio}</p>
      </section>
    </article>
  );
};
