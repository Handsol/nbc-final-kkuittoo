import { getUserImageByLevel } from '@/lib/utils/user.utils';
import Image from 'next/image';

type Props = { userName?: string | null; level: number };

export const NormalUserAvatar = ({ userName, level }: Props) => {
  const imageUrl = getUserImageByLevel(level);
  return (
    <figure className="w-16 h-16 bg-sub-light rounded-full flex items-center justify-center mb-2 overflow-hidden shrink-0 relative">
      <Image
        src={imageUrl ?? '/images/default.png'}
        alt={userName ?? '유저 아바타'}
        width={64}
        height={64}
        className="object-cover rounded-lg"
      />
    </figure>
  );
};
