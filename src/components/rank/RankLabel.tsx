type Props = {
  rank: number;
  className?: string;
};

const getRankSuffix = (rank: number) => {
  switch (rank) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
};

export const RankLabel = ({ rank, className }: Props) => {
  return (
    <span className={className}>
      {rank}
      {getRankSuffix(rank)}
    </span>
  );
};
