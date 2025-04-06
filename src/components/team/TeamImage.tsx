import Image from 'next/image';

type TeamImageProps = {
  currentQuestImg: string;
  emblem: string;
};

const TeamImage = ({ currentQuestImg, emblem }: TeamImageProps) => {
  return (
    <div className="relative w-64 h-60">
      {/* src는 추후에 수정할 예정 */}
      <Image
        src={'/teamQuest'}
        alt="teamQuest"
        fill
        sizes="256px"
        className="bg-neutral-500 rounded-3xl"
      />
      <Image
        src={'/emblem'}
        alt="emblem"
        width={60}
        height={60}
        className="rounded-full bg-neutral-700 absolute bottom-3 right-3"
      />
    </div>
  );
};

export default TeamImage;
