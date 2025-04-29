import { CommonModal } from '@/components/common/CommonModal';
import Text from '@/components/common/Text';
import Title from '@/components/common/Title';
import { TITLE_MODE } from '@/constants/mode.constants';
import TeamLinkShareButton from './TeamLinkShareButton';
import { ID_SLICE } from '@/constants/magic-numbers.constants';
import Image from 'next/image';
import { IMAGE_ASSETS } from '@/constants/assets.constants';

type TeamInviteModalProps = {
  id: string;
  isOpen: boolean;
  onClose: () => void;
};

const TeamInviteModal = ({ id, isOpen, onClose }: TeamInviteModalProps) => {
  const password = id.slice(ID_SLICE.TEAM);

  return (
    <CommonModal isOpen={isOpen} onClose={onClose}>
      <Title mode={TITLE_MODE.SECTION_TITLE}>팀 초대하기</Title>
      <div className="w-full flex flex-col justify-between items-center gap-5 my-5">
        <Image
          src={IMAGE_ASSETS.SPRITE.YELLOW}
          alt="팀 초대하기 모달 이미지"
          width={300}
          height={200}
          className="rounded-xl"
        />
        <div className="flex flex-col items-center">
          <Title mode={TITLE_MODE.SECTION_SUBTITLE}>
            비밀번호 : {password}
          </Title>
          <Text>위 비밀번호를 친구에게 공유하세요!</Text>
        </div>
        <TeamLinkShareButton id={id} />
      </div>
    </CommonModal>
  );
};

export default TeamInviteModal;
