import { UserRankCard } from './UserRankCard';
import { UserData } from '@/types/rank.type';

type Props = {
  topUsers: UserData[];
};

export const UserTopSection = ({ topUsers }: Props) => {
  const ordered = [topUsers[1], topUsers[0], topUsers[2]]; // 2,1,3 순서

  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[52px] items-end">
        {ordered.map((user) => {
          const rank = topUsers.indexOf(user) + 1;
          return (
            <div key={user.id} className="flex justify-center">
              <UserRankCard user={user} rank={rank} isTopRank />
            </div>
          );
        })}
      </div>
    </section>
  );
};
