'use client';

import { useState } from 'react';
import TeamPasswordForm from './TeamPasswordForm';
import { ACTIONBUTTON_MODE, TITLE_MODE } from '@/constants/mode.constants';
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
import { CommonModal } from '@/components/common/CommonModal';
import ActionButton from '@/components/common/button/ActionButton';
import Image from 'next/image';
import { IMAGE_ASSETS } from '@/constants/assets.constants';

type TeamJoinPrivateModalProps = {
  teamId: string;
};

const TeamJoinPrivateModal = ({ teamId }: TeamJoinPrivateModalProps) => {
  // 모달창 state
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <ActionButton
        mode={ACTIONBUTTON_MODE.DARK_GRAY_SMALL}
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        JOIN
      </ActionButton>
      <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center gap-3">
          <Title mode={TITLE_MODE.SECTION_SUBTITLE}>
            JOIN THIS PRIVATE TEAM
          </Title>
          <Image
            src={IMAGE_ASSETS.SPRITE.PINK}
            alt="team join image"
            width={300}
            height={200}
            className="rounded-lg"
          />
          <Text className="">
            비공개 팀에 가입하기 위해선 비밀번호가 필요합니다! 초대장 확인 후,
            비밀번호를 입력해주세요.
          </Text>
          <TeamPasswordForm teamId={teamId} />
        </div>
      </CommonModal>
    </div>
  );
};

export default TeamJoinPrivateModal;
