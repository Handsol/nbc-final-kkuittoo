import Image from 'next/image';

type Props = { teamName?: string };

export const NormalTeamEmblem = ({ teamName }: Props) => {
  return (
    <figure className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mr-4">
      <Image
        src="/images/default-emblem.png"
        alt={teamName ?? 'Team'}
        width={64}
        height={64}
        className="object-cover rounded-lg"
      />
    </figure>
  );
};
