'use client';

import { useState } from 'react';
import { useUserRankQuery } from '@/lib/queries/useUserRankQuery';
import { UserData } from '@/types/rank.type';
import { UserRankCard } from './user/UserRankCard';
import ActionButton from '../common/button/ActionButton';

type Props = {
  initialUsers: UserData[];
};

export const ShowMoreWrapper = ({ initialUsers }: Props) => {
  const [isFetchStarted, setIsFetchStarted] = useState(false);
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useUserRankQuery();

  const fetchedUsers = isFetchStarted ? (data?.pages.flat() ?? []) : [];
  const allUsers = [...initialUsers, ...fetchedUsers];

  const handleLoadMore = () => {
    console.log('더보기 버튼 눌림');
    if (!isFetchStarted) {
      setIsFetchStarted(true);
    }
    fetchNextPage();
  };

  return (
    <div className="space-y-4">
      <ul className="space-y-4">
        {allUsers.map((user) => (
          <li key={user.id}>
            <UserRankCard user={user} rank={user.rank} isTopRank={false} />
          </li>
        ))}
      </ul>

      <div className="flex justify-center mt-4">
        <ActionButton
          mode="secondary"
          onClick={handleLoadMore}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage
            ? '불러오는 중...'
            : hasNextPage === false && isFetchStarted
              ? '마지막입니다'
              : '더보기'}
        </ActionButton>
      </div>
    </div>
  );
};
