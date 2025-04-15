import Image from 'next/image';

type Props = { userName?: string | null; image?: string | null };

export const TopUserAvatar = ({ userName, image }: Props) => {
  return (
    <figure className="w-28 h-28 bg-gray-300 rounded-lg flex items-center justify-center">
      <Image
        src={image ?? '/images/default.png'}
        alt={userName ?? '유저 아바타'}
        width={112}
        height={112}
        className="object-cover rounded-lg"
      />
    </figure>
  );
};
