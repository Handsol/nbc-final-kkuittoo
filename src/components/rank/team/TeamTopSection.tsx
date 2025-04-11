import { TeamCard } from './TeamRankCard';
import { TeamWithPoints } from '@/types/rank.type';

type Props = {
  topTeams: TeamWithPoints[];
};

export const TeamTopSection = ({ topTeams }: Props) => {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {topTeams.map((team, index) => (
          <div key={team.id}>
            <TeamCard team={team} rank={index + 1} isTopRank />
          </div>
        ))}
      </div>
    </section>
  );
};
