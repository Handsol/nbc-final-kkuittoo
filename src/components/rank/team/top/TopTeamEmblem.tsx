import Image from 'next/image';

type Props = { teamName?: string };

export const TeamEmblem = ({ teamName }: Props) => {
  return (
    <figure className="w-28 h-28 bg-gray-300 rounded-lg flex items-center justify-center mb-2">
      <Image
        src="/images/default-emblem.png"
        alt={teamName ?? 'Team'}
        width={112}
        height={112}
        className="object-cover rounded-lg"
      />
    </figure>
  );
};
