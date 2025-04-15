import Image from 'next/image';

type Props = { teamName?: string };

export const TeamEmblem = ({ teamName }: Props) => {
  return (
    <figure className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-2 overflow-hidden">
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
