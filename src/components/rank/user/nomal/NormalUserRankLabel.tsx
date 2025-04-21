import UserTitle from '@/components/common/UserTitle';
import { USER_TITLE_MODE } from '@/constants/mode.constants';
import { RankLabel } from '../../RankLabel';

type Props = { rank: number };

export const NormalUserRankLabel = ({ rank }: Props) => {
  return (
    <UserTitle mode={USER_TITLE_MODE.CARD_RANK}>
      <RankLabel className="text-dark-gray" rank={rank} />
    </UserTitle>
  );
};
