import { TeamData } from '@/types/teams';

// 한 팀의 정보를 카드 형태로 보여주는 컴포넌트임당
export const TeamCard = ({ team }: { team: TeamData }) => {
  return (
    <div className="border rounded-lg p-4 w-80 shadow-md">
      <img
        src={team.emblem}
        alt={`${team.teamName} 엠블럼`}
        className="w-16 h-16 mb-2"
      />
      <h2 className="text-xl font-bold">{team.teamName}</h2>
      <p className="text-gray-600">{team.teamBio}</p>
      <p className="text-sm mt-2">최대 인원: {team.maxTeamSize}명</p>
    </div>
  );
};
