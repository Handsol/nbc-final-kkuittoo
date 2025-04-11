import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { TeamWithPoints } from '@/types/rank.type';

type Props = { team: TeamWithPoints };

export const NormalTeamInfo = ({ team }: Props) => {
  return (
    <section className="flex-1">
      <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>Lv. 1</UserTitle>
      <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{team.teamName}</UserTitle>
      <p>
        {team.memberCount}/{team.maxTeamSize}
      </p>
      <p className="text-gray-600 truncate">{team.teamBio}</p>
    </section>
  );
};
