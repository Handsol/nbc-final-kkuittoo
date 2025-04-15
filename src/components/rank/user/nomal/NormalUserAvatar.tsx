import Image from 'next/image';

type Props = { userName?: string | null; image?: string | null };

export const NormalUserAvatar = ({ userName, image }: Props) => {
  return (
    <figure className="w-16 h-16 bg-gray-300 rounded-lg flex items-center justify-center mr-4">
      <Image
        src={image ?? '/images/default.png'}
        alt={userName ?? '유저 아바타'}
        width={64}
        height={64}
        className="object-cover rounded-lg"
      />
    </figure>
  );
};
