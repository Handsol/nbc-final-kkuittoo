import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { UserData } from '@/types/rank.type';
import Image from 'next/image';

interface Props {
  user: UserData;
  rank: number;
}

export const NormalRankCard = ({ user, rank }: Props) => {
  return (
    <article className="border rounded-3xl p-4 shadow-md bg-gray-100 w-full h-24 flex flex-row items-center">
      {/* 랭킹 표시 */}
      <UserTitle mode={USER_TITLE_MODE.CARD_RANK}>
        {rank}
        {rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}
      </UserTitle>

      {/** 사용자 이미지 */}
      <figure className="w-16 h-16 mr-4 bg-gray-300 rounded-lg flex items-center justify-center">
        <Image
          src={user.image ?? '/images/default.png'}
          alt={user.name ?? '유저 이미지'}
          width={64}
          height={64}
          className="object-cover rounded-lg"
        />
      </figure>

      {/* 사용자 정보 (레벨, 이름, 소개) */}
      <section className="flex-1">
        <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>Lv. 1</UserTitle>
        <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{user.name}</UserTitle>
        <p>{user.bio}</p>
      </section>
    </article>
  );
};
