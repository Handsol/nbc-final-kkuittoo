import { TeamCard } from './TeamRankCard';
import { TeamWithPoints } from '@/types/rank.type';

type Props = {
  otherTeams: TeamWithPoints[];
};

export const OtherTeamsSection = ({ otherTeams }: Props) => {
  return (
    <section>
      {otherTeams.length === 0 ? (
        <p className="text-center text-gray-500">검색 결과가 없습니다.</p>
      ) : (
        <ul className="space-y-4">
          {otherTeams.map((team, index) => (
            <li key={team.id}>
              <TeamCard
                team={team}
                rank={team.rank ?? index + 4}
                isTopRank={false}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};
