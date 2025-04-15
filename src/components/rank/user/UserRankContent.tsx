import { fetchGetUsersWithTotalPoints } from '@/lib/services/user-actions.services';
import { UserRankHeader } from './UserRankHeader';
import { UserTopSection } from './UserTopSection';
import { UserOtherSection } from './UserOtherSection';
import { searchUsers } from '@/lib/services/search-actions.services';

type UserRankContentProps = {
  searchParams?: { q?: string };
};

// 유저 랭킹 UI
export const UserRankContent = async ({
  searchParams,
}: UserRankContentProps) => {
  const searchTerm = searchParams?.q || '';

  const usersList = await fetchGetUsersWithTotalPoints();
  console.log('Total users fetched:', usersList.length);

  const filteredUsers = await searchUsers(searchTerm);
  console.log('Filtered users:', filteredUsers.length);

  const topUsers = usersList.slice(0, 3); // 1~3위
  const otherUsers = searchTerm ? filteredUsers : usersList.slice(3);
  return (
    <div className="flex flex-col gap-4">
      <UserRankHeader />
      <section className="w-full max-w-[1024px] p-8 mx-auto bg-gray-400 rounded-2xl">
        <UserTopSection topUsers={topUsers} />
        <UserOtherSection otherUsers={otherUsers} />
      </section>
    </div>
  );
};
