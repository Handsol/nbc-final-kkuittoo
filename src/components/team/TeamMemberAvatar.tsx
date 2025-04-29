import { getUserImageByLevel } from '@/lib/utils/user.utils';
import Image from 'next/image';

type Props = { userName?: string | null; level: number };

export const TeamMemberAvatar = ({ userName, level }: Props) => {
  const imageUrl = getUserImageByLevel(level);
  return (
    <figure className="w-24 h-24 md:w-16 md:h-16 bg-sub-light flex items-center justify-center mb-2 overflow-hidden shrink-0 relative">
      <Image
        src={imageUrl ?? '/images/default.png'}
        alt={userName ?? '유저 아바타'}
        width={128}
        height={128}
        className="object-cover rounded-lg w-full h-full"
      />
    </figure>
  );
};
