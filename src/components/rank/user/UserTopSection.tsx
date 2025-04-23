import { UserRankCard } from './UserRankCard';
import { UserData } from '@/types/rank.type';

type Props = {
  topUsers: UserData[];
};

export const UserTopSection = ({ topUsers }: Props) => {
  const ordered = [topUsers[1], topUsers[0], topUsers[2]]; // 2,1,3 순서

  // 딜레이를 3등부터 먼저 나오도록 순서 맞추기
  const delays = [300, 600, 100]; // index 0=2등(왼), 1=1등(가운데), 2=3등(오른)

  return (
    <section className="mb-8">
      <div className="grid grid-cols-3 gap-[10px] sm:gap-[52px] items-end justify-center">
        {ordered.map((user, idx) => {
          const rank = topUsers.indexOf(user) + 1;

          return (
            <div key={user.id} className="flex justify-center">
              <UserRankCard
                user={user}
                rank={rank}
                isTopRank
                animationDelay={delays[idx]} // 딜레이 전달
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
