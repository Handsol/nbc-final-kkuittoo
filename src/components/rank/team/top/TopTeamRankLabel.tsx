import { RankLabel } from '../../RankLabel';
import Title from '@/components/common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';

type Props = { rank: number };

export const TeamRankLabel = ({ rank }: Props) => {
  return (
    <Title
      mode={TITLE_MODE.SECTION_TITLE}
      className="text-xl font-bold text-gray-700 mb-2"
    >
      <RankLabel rank={rank} />
    </Title>
  );
};
