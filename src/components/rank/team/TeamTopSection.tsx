import { TeamCard } from './TeamRankCard';
import { TeamWithPoints } from '@/types/rank.type';

type Props = {
  topTeams: TeamWithPoints[];
};

export const TeamTopSection = ({ topTeams }: Props) => {
  const ordered = [topTeams[1], topTeams[0], topTeams[2]]; // 2,1,3 순서

  const delays = [300, 600, 100];
  return (
    <section className="mb-8">
      <div className="grid grid-cols-3 gap-[10px] md:grid-cols-3 md:gap-[52px] items-end">
        {ordered.map((team, idx) => {
          const rank = topTeams.indexOf(team) + 1; // 실제 순위 유지
          return (
            <div key={team.id} className="flex justify-center">
              <TeamCard
                team={team}
                rank={rank}
                isTopRank
                animationDelay={delays[idx]}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};
