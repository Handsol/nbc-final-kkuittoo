import { fetchGetFilteredUsersWithTotalPoints } from '@/lib/services/user-actions.services';
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
  const isSearching = Boolean(searchTerm);

  const usersList = await fetchGetFilteredUsersWithTotalPoints();

  const userItem = usersList.filter((user) => user.userItems.length > 0);

  const topUsers = usersList.slice(0, 3); // 1~3위
  const otherUsers = isSearching
    ? await searchUsers(searchTerm)
    : usersList.slice(3);
  return (
    <div className="flex flex-col gap-4">
      <UserRankHeader />
      <section className="w-full max-w-[1440px] p-8 mx-auto bg-white rounded-2xl">
        <UserTopSection topUsers={topUsers} />
        <UserOtherSection otherUsers={otherUsers} isSearching={isSearching} />
      </section>
    </div>
  );
};
