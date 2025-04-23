type Props = {
  rank: number;
  className?: string;
};

export const RankLabel = ({ rank, className }: Props) => {
  return <span className={className}>{rank}</span>;
};
