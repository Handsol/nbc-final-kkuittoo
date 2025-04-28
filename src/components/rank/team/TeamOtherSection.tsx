import Text from '@/components/common/Text';
import { TeamShowMoreWrapper } from './ShowMoreWrapper';
import { TeamCard } from './TeamRankCard';
import { TeamWithPoints } from '@/types/rank.type';

type Props = {
  otherTeams: TeamWithPoints[];
  isSearching: boolean;
  hasTeam: boolean;
};

export const OtherTeamsSection = ({
  otherTeams,
  isSearching,
  hasTeam,
}: Props) => {
  if (otherTeams.length === 0) {
    return (
      <Text className="text-center text-gray-500">검색 결과가 없습니다.</Text>
    );
  }

  return (
    <section>
      {isSearching ? (
        <ul className="space-y-4">
          {otherTeams.map((team) => (
            <li key={team.id}>
              <TeamCard
                team={team}
                rank={team.rank ?? 0}
                isTopRank={false}
                hasTeam={hasTeam}
              />
            </li>
          ))}
        </ul>
      ) : (
        <TeamShowMoreWrapper initialTeams={otherTeams} hasTeam={hasTeam} />
      )}
    </section>
  );
};
