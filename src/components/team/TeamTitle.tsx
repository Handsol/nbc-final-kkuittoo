import { USER_TITLE_MODE } from '@/constants/mode.constants';
import UserTitle from '../common/UserTitle';

type TeamTitleProps = {
  teamName: string;
  currentQuestName: string;
};

const TeamTitle = ({ teamName, currentQuestName }: TeamTitleProps) => {
  return (
    <div>
      <UserTitle mode={USER_TITLE_MODE.CARD_NAME}>{teamName}</UserTitle>
      <UserTitle mode={USER_TITLE_MODE.CARD_LEVEL}>
        {currentQuestName}
      </UserTitle>
    </div>
  );
};

export default TeamTitle;
