import { UserRankCard } from './UserRankCard';
import { UserData } from '@/types/rank.type';

type Props = {
  otherUsers: UserData[];
};

export const UserOtherSection = ({ otherUsers }: Props) => {
  return (
    <section>
      {otherUsers.length === 0 ? (
        <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {otherUsers.map((user) => (
            <li key={user.id}>
              <UserRankCard user={user} rank={user.rank} isTopRank={false} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
