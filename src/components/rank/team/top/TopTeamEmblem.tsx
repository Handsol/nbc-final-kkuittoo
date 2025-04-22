import Image from 'next/image';

type Props = { teamName?: string; emblem?: string };

export const TeamEmblem = ({ teamName, emblem }: Props) => {
  return (
    <figure className="w-20 h-20md:w-28 md:h-28 bg-white flex items-center justify-center overflow-hidden">
      <Image
        src={emblem ?? '/images/default-emblem.png'}
        alt={teamName ?? 'Team'}
        width={112}
        height={112}
        className="object-cover rounded-lg"
      />
    </figure>
  );
};
