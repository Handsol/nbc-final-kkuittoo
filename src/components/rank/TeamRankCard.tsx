import { TeamWithPoints } from '@/types/rank-users.type';
import { TeamData } from '@/types/teams.type';

type TeamCardProps = {
  team: TeamWithPoints;
  rank: number;
};
// 한 팀의 정보를 카드 형태로 보여주는 컴포넌트임당
export const TeamCard = ({ team, rank }: TeamCardProps) => {
  return (
    <div className="border rounded-lg p-4 w-80 shadow-md">
      <div className="flex items-center mb-2">
        <img
          src={team.emblem}
          alt={`${team.teamName} 엠블럼`}
          className="w-16 h-16 mr-4"
        />
        <div>
          <h2 className="text-xl font-bold">
            {rank}th {team.teamName}
          </h2>
          <p className="text-sm text-gray-600">
            멤버: {team.memberCount}/{team.maxTeamSize}
          </p>
          <p className="text-sm text-gray-600">총 포인트: {team.totalPoints}</p>
        </div>
      </div>
      <p className="text-gray-600 mb-2">{team.teamBio}</p>
      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        가입하기
      </button>
    </div>
  );
};
