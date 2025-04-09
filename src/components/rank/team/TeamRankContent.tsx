'use client';

import CommonInputBar from '@/components/common/CommonInputBar';
import { TeamCard } from './TeamRankCard';
import { useTeamQuery } from '@/lib/queries/useTeamQuery';
import { TeamWithPoints } from '@/types/rank-users.type';
import Link from 'next/link';
import { useState } from 'react';
import { TeamDetailModal } from './TeamDetailModalContents';
import { CommonModal } from '@/components/common/CommonModal';

// 팀 랭킹 UI
export const TeamRankContent = () => {
  const {
    data: teamsList = [] as TeamWithPoints[],
    isPending,
    isError,
  } = useTeamQuery(); // 데이터 가져오기

  const [selectedTeam, setSelectedTeam] = useState<TeamWithPoints | null>(null);

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const topTeams = teamsList.slice(0, 3); // 1~3위
  const otherTeams = teamsList.slice(3); // 4위부터
  return (
    <>
      <div className="flex items-center space-x-2 mb-8">
        <Link href="/rank/users">
          <button className="border rounded-2xl p-1 w-40 text-gray-600 hover:bg-gray-400">
            Character
          </button>
        </Link>
        {/* 버튼 비활성화 */}
        <button
          className="border rounded-2xl p-1 w-40 bg-gray-400 text-gray-600"
          disabled
        >
          Team
        </button>
        {/* 검색 입력창 (아직 기능 미구현) */}
        <CommonInputBar id="teamSearch" placeholder="팀 이름을 검색해보세요." />
      </div>
      <div className="-full max-w-[1024px] p-8 mx-auto bg-gray-400 rounded-2xl">
        {/* 상단 3개 팀: 1, 2, 3위 */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {topTeams.map((team, index) => (
              <div key={team.id}>
                {/* isTopRank:true로 상단 스타일 적용 */}
                <TeamCard
                  team={team}
                  rank={index + 1}
                  isTopRank={true}
                  onClick={() => setSelectedTeam(team)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* 하단: 나머지 팀 */}
        <div className="space-y-4">
          {/* isTopRank:false로 하단 스타일 적용 */}
          {otherTeams.map((team, index) => (
            <TeamCard
              key={team.id}
              team={team}
              rank={index + 4}
              isTopRank={false}
              onClick={() => setSelectedTeam(team)}
              // 카드 클릭 시 해당 팀 정보 저장
            />
          ))}
        </div>
      </div>

      <CommonModal
        isOpen={!!selectedTeam} // 선택된 팀이 있을 경우 모달 열림
        onClose={() => setSelectedTeam(null)}
        // 모달 닫으면서 팀 선택 해제
      >
        {selectedTeam && (
          <TeamDetailModal
            team={selectedTeam}
            onClose={() => setSelectedTeam(null)}
          />
        )}
      </CommonModal>
    </>
  );
};
