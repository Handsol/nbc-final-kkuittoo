import { getUserImageByLevel } from '@/lib/utils/user.utils';
import Image from 'next/image';

type Props = { userName?: string | null; level: number };
export const TopUserAvatar = ({ userName, level }: Props) => {
  const imageUrl = getUserImageByLevel(level);
  return (
    <figure
      className="w-20 h-20 md:w-28 md:h-28  bg-white rounded-full flex items-center
     justify-center overflow-hidden
     "
    >
      <Image
        src={imageUrl}
        alt={userName ?? '유저 아바타'}
        width={112}
        height={112}
        className="object-cover rounded-lg"
      />
    </figure>
  );
};
