import { TeamCardProps } from '@/types/rank-users.type';
import Image from 'next/image';

// 한 팀의 정보를 카드 형태로 보여주는 컴포넌트임당
// isTopRank로 상단 3위와 나머지 스타일 구별
export const TeamCard = ({ team, rank, isTopRank }: TeamCardProps) => {
  const imageSize = isTopRank ? 112 : 64;

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
          <h2 className="text-xl font-bold text-gray-700">
            {rank}
            {rank === 1 ? 'st' : rank === 2 ? 'nd' : rank === 3 ? 'rd' : 'th'}
          </h2>
        </div>
        <div
          className={`${
            isTopRank ? 'w-28 h-28 mb-2' : 'w-16 h-16 mr-4'
          } bg-gray-300 rounded-lg flex items-center justify-center`}
        >
          <Image
            src={'/images/default-emblem.png'}
            alt={`${team.teamName}`}
            width={imageSize}
            height={imageSize}
            className="object-cover rounded-lg"
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
