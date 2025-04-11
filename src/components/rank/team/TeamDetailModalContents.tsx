import { TeamWithPoints } from '@/types/rank.type';

type Props = {
  team: TeamWithPoints;
  onClose: () => void;
};

export const TeamDetailModal = ({ team, onClose }: Props) => {
  return (
    <div className="bg-gray-400 text-center">
      <h2 className="text-2xl font-bold mb-2">{team.teamName}</h2>
      <p className="text-gray-600 mb-2">Lv. 1</p>
      <p className="text-gray-600 mb-4">{team.teamBio}</p>
      <p>
        구성원 수: {team.memberCount}/{team.maxTeamSize}
      </p>
      <button
        className="mt-4 px-4 py-2 bg-gray-300 text-black rounded"
        onClick={onClose}
      >
        닫기
      </button>
    </div>
  );
};
