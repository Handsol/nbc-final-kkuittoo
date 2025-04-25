'use client';

import { useState } from 'react';
import TeamPasswordForm from './TeamPasswordForm';
import {
  ACTIONBUTTON_MODE,
  JOINBUTTON_MODE,
  TITLE_MODE,
} from '@/constants/mode.constants';
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
import { CommonModal } from '@/components/common/CommonModal';
import ActionButton from '@/components/common/button/ActionButton';
import Image from 'next/image';
import { IMAGE_ASSETS } from '@/constants/assets.contants';

type TeamJoinPrivateModalProps = {
  teamId: string;
  mode?: string;
};

const TeamJoinPrivateModal = ({ teamId, mode }: TeamJoinPrivateModalProps) => {
  // 모달창 state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isTeamJoinButton = mode === JOINBUTTON_MODE.TEAM_PAGE;

  return (
    <div>
      <ActionButton
        mode={
          isTeamJoinButton
            ? ACTIONBUTTON_MODE.ROUNDED_MD
            : ACTIONBUTTON_MODE.DARK_GRAY_SMALL
        }
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        가입하기
      </ActionButton>
      <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col items-center gap-3">
          <Title mode={TITLE_MODE.SECTION_SUBTITLE}>비공개 팀 가입하기</Title>
          <Image
            src={IMAGE_ASSETS.SPRITE.PINK}
            alt="team join image"
            width={300}
            height={200}
            className="rounded-lg"
          />
          <Text className="text-center">
            비공개 팀에 가입하기 위해선 비밀번호가 필요합니다!
            <br /> 초대장 확인 후, 비밀번호를 입력해주세요.
          </Text>
          <TeamPasswordForm teamId={teamId} />
        </div>
      </CommonModal>
    </div>
  );
};

export default TeamJoinPrivateModal;
