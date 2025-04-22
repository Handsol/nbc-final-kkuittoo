import Image from 'next/image';

type Props = { teamName?: string; embluem?: string };

export const NormalTeamEmblem = ({ teamName, embluem }: Props) => {
  return (
    <figure className="w-5 h-5 md:w-20 md:h-20 bg-sub-light rounded-full flex items-center justify-center mb-2 overflow-hidden shrink-0 relative">
      <Image
        src={embluem ?? '/images/default-emblem.png'}
        alt={teamName ?? 'Team'}
        width={64}
        height={64}
        className="object-cover rounded-lg"
      />
    </figure>
  );
};
