import CommonInputBar from '@/components/common/CommonInputBar';
import { TeamCard } from './TeamRankCard';
import Link from 'next/link';
import { getTeamsWithPoints } from '@/lib/services/team-actions.services';

// 팀 랭킹 UI
export const TeamRankContent = async () => {
  const teamsList = await getTeamsWithPoints();
  const topTeams = teamsList.slice(0, 3); // 1~3위
  const otherTeams = teamsList.slice(3); // 4위부터
  return (
    <>
      <section className="flex items-center space-x-2 mb-8">
        <article>
          <Link href="/rank/users">
            <button className="border rounded-2xl p-1 w-40 text-gray-600 hover:bg-gray-400">
              Character
            </button>
          </Link>
        </article>
        <article>
          <button
            className="border rounded-2xl p-1 w-40 bg-gray-400 text-gray-600"
            disabled
          >
            Team
          </button>
        </article>
        {/* 검색 입력창 (아직 기능 미구현) */}
        <article>
          <CommonInputBar
            id="teamSearch"
            placeholder="팀 이름을 검색해보세요."
          />
        </article>
      </section>
      <section className="-full max-w-[1024px] p-8 mx-auto bg-gray-400 rounded-2xl">
        {/* 상단 3개 팀: 1, 2, 3위 */}
        <section className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {topTeams.map((team, index) => (
              <div key={team.id}>
                {/* isTopRank:true로 상단 스타일 적용 */}
                <TeamCard team={team} rank={index + 1} isTopRank={true} />
              </div>
            ))}
          </div>
        </section>

        {/* 하단: 나머지 팀 */}
        <section>
          {/* isTopRank:false로 하단 스타일 적용 */}
          <ul className="space-y-4">
            {otherTeams.map((team, index) => (
              <li key={team.id}>
                <TeamCard team={team} rank={index + 4} isTopRank={false} />
              </li>
            ))}
          </ul>
        </section>
      </section>
    </>
  );
};
