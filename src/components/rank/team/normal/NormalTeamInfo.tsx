import Text from '@/components/common/Text';
import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { getCurrentTeamQuest } from '@/lib/utils/team.utils';
import { TeamWithPoints } from '@/types/rank.type';

type Props = { team: TeamWithPoints };

export const NormalTeamInfo = ({ team }: Props) => {
  const currentQuest = getCurrentTeamQuest(team.totalPoints);
  return (
    <section className="flex flex-col">
      <div className="flex items-center gap-2">
        <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{team.teamName}</UserTitle>
        <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
          Lv. {currentQuest.id}
        </UserTitle>
        <Text>
          {team.memberCount}/{team.maxTeamSize}
        </Text>
      </div>
      <Text className="text-dark-gray truncate">{team.teamBio}</Text>
    </section>
  );
};
