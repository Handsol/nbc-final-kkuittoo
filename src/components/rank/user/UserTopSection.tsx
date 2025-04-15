import { UserRankCard } from './UserRankCard';
import { UserData } from '@/types/rank.type';

type Props = {
  topUsers: UserData[];
};

export const UserTopSection = ({ topUsers }: Props) => {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {topUsers.map((user, index) => (
          <div key={user.id}>
            <UserRankCard user={user} rank={index + 1} isTopRank />
          </div>
        ))}
      </div>
    </section>
  );
};
