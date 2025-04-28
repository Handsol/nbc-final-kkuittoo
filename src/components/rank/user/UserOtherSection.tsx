import { ShowMoreWrapper } from '../ShowMoreWrapper';
import { UserRankCard } from './UserRankCard';
import { UserData } from '@/types/rank.type';

type Props = {
  otherUsers: UserData[];
  isSearching: boolean;
};

export const UserOtherSection = ({ otherUsers, isSearching }: Props) => {
  if (otherUsers.length === 0) {
    return <p className="text-center text-gray-500">검색 결과가 없습니다.</p>;
  }

  return (
    <section>
      {isSearching ? (
        <ul className="space-y-4">
          {otherUsers.map((user) => (
            <li key={user.id}>
              <UserRankCard user={user} rank={user.rank} isTopRank={false} />
            </li>
          ))}
        </ul>
      ) : (
        <ShowMoreWrapper initialUsers={otherUsers} />
      )}
    </section>
  );
};
