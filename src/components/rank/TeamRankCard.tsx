import { TeamWithPoints } from '@/types/rank-users.type';

type TeamCardProps = {
  team: TeamWithPoints; // 팀 데이터
  rank: number; // 순위
  isTopRank: boolean; // 상단 3위 여부
};
// 한 팀의 정보를 카드 형태로 보여주는 컴포넌트임당
// isTopRank로 상단 3위와 나머지 스타일 구별
export const TeamCard = ({ team, rank, isTopRank }: TeamCardProps) => {
  return (
    <div
      className={`border rounded-3xl p-4 shadow-md bg-gray-100 ${
        isTopRank
          ? 'w-64 h-72 flex flex-col items-center justify-center'
          : 'w-full h-24 flex flex-row items-center'
      }`}
    >
      <div
        className={
          isTopRank ? 'flex flex-col items-center' : 'flex items-center w-full'
        }
      >
        <div className={isTopRank ? 'mb-2' : 'mr-4'}>
          <h2 className="text-xl font-bold text-gray-700">{rank}rd</h2>
        </div>
        <div
          className={`${
            isTopRank ? 'w-28 h-28 mb-2' : 'w-16 h-16 mr-4'
          } bg-gray-300 rounded-lg flex items-center justify-center`}
        >
          <img
            src={team.emblem}
            alt={`${team.teamName}`}
            className={`${
              isTopRank ? 'w-28 h-28 mb-2' : 'w-16 h-16 mr-4'
            } rounded-lg object-cover`}
          />
        </div>
        <div className={isTopRank ? 'text-center' : 'flex-1'}>
          <p className="text-sm text-gray-600">Lv. 1</p>
          <h2 className="text-xl font-bold text-gray-700">{team.teamName}</h2>
          {team.memberCount}/{team.maxTeamSize}
          <p className="text-gray-600">{team.teamBio}</p>
        </div>
      </div>
    </div>
  );
};
