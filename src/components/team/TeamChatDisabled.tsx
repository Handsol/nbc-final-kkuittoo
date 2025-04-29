import { TITLE_MODE } from '@/constants/mode.constants';
import Title from '../common/Title';
import Text from '../common/Text';
import Image from 'next/image';
import { IMAGE_ASSETS } from '@/constants/assets.constants';

const TeamChatDisabled = () => {
  return (
    <section className="flex-1 w-full mt-11 mb-11 bg-white rounded-lg">
      <Title mode={TITLE_MODE.SECTION_TITLE}>팀 채팅</Title>
      <div className="flex flex-col mt-6 h-96 bg-light-gray rounded-lg justify-center items-center gap-5">
        <Image
          src={IMAGE_ASSETS.SPRITE.BLUE}
          alt="TeamChatDisabled image"
          width={250}
          height={200}
          className="rounded-lg"
        />
        <div className="flex flex-col items-center">
          <Title mode={TITLE_MODE.SECTION_SUBTITLE}>
            해당 팀 멤버만 채팅을 볼 수 있어요
          </Title>
          <Text>채팅을 확인하려면 해당 팀에 가입해야해요!</Text>
        </div>
      </div>
    </section>
  );
};

export default TeamChatDisabled;
