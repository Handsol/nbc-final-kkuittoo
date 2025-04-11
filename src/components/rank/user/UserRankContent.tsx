import CommonInputBar from '@/components/common/CommonInputBar';
import { UserCard } from './UserRankCard';
import { fetchGetUsersWithTotalPoints } from '@/lib/services/user-actions.services';
import LinkButton from '@/components/common/button/LinkButton';
import { ACTIONBUTTON_MODE, LINKBUTTON_MODE } from '@/constants/mode.constants';
import ActionButton from '@/components/common/button/ActionButton';
import { PATH } from '@/constants/path.constants';
// 유저 랭킹 UI
export const UserRankContent = async () => {
  const users = await fetchGetUsersWithTotalPoints();

  const topUsers = users.slice(0, 3); // 1~3d위
  const otherUsers = users.slice(3); // 4위부터

  return (
    <div className="flex flex-col gap-4">
      <section className="flex items-center space-x-2 mb-8">
        <article>
          <ActionButton mode={ACTIONBUTTON_MODE.SECONDARY} disabled={true}>
            Character
          </ActionButton>
        </article>
        <article>
          <LinkButton mode={LINKBUTTON_MODE.COMMON} href={PATH.RANK.TEAMS}>
            Team
          </LinkButton>
        </article>
        <article>
          <CommonInputBar
            id="userSearch"
            placeholder="캐릭터 이름을 검색해보세요."
          />
        </article>
      </section>
      <section className="w-full max-w-[1024px] p-8 mx-auto bg-gray-400 rounded-2xl">
        {/* 상단 3명: 1, 2, 3위*/}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {topUsers.map((user, index) => (
              <div key={user.id}>
                <UserCard user={user} rank={index + 1} isTopRank={true} />
              </div>
            ))}
          </div>
        </section>

        {/* 하단: 나머지 유저 */}
        <section>
          <ul className="space-y-4">
            {otherUsers.map((user, index) => (
              <li key={user.id}>
                <UserCard user={user} rank={index + 4} isTopRank={false} />
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  );
};
