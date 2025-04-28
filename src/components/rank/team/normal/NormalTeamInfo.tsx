import Text from '@/components/common/Text';
import UserTitle from '@/components/common/UserTitle';
import TeamOpenNotEditMode from '@/components/team/team-edit/TeamOpenNotEditMode';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { getCurrentTeamQuest } from '@/lib/utils/team.utils';
import { TeamWithPoints } from '@/types/rank.type';

type Props = { team: TeamWithPoints };

export const NormalTeamInfo = ({ team }: Props) => {
  const currentQuest = getCurrentTeamQuest(team.totalPoints);
  return (
    <section className="flex flex-col">
      <div className="flex items-center gap-2">
        <UserTitle
          mode={USER_TITLE_MODE.CARD_NAME}
          className="truncate w-16 md:w-24 text-body-xs md:text-base"
        >
          {team.teamName}
        </UserTitle>
        <UserTitle
          mode={USER_TITLE_MODE.CARD_LEVEL}
          className="truncate max-w-[100px] md:max-w-[160px] text-body-xs md:text-base"
        >
          Lv. {currentQuest.id}
        </UserTitle>
        <div className="flex items-center gap-1">
          <Text>
            {team.memberCount}/{team.maxTeamSize}
          </Text>
          <div className="shrink-0">
            <TeamOpenNotEditMode isOpened={team.isOpened} />
          </div>
        </div>
      </div>
      <Text className="text-dark-gray truncate  max-w-[100px] dm:max-w-[160px]">
        {team.teamBio}
      </Text>
    </section>
  );
};
