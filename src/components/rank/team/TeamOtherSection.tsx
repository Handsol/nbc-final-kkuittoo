import { TeamCard } from './TeamRankCard';
import { TeamWithPoints } from '@/types/rank.type';

type Props = {
  otherTeams: TeamWithPoints[];
};

export const OtherTeamsSection = ({ otherTeams }: Props) => {
  return (
    <section>
      <ul className="space-y-4">
        {otherTeams.map((team, index) => (
          <li key={team.id}>
            <TeamCard team={team} rank={index + 4} isTopRank={false} />
          </li>
        ))}
      </ul>
    </section>
  );
};
