'use client';

import { useState } from 'react';
import TeamPasswordForm from './TeamPasswordForm';
import { TITLE_MODE } from '@/constants/mode.constants';
import Title from '@/components/common/Title';
import Text from '@/components/common/Text';
import { CommonModal } from '@/components/common/commonModal';

type TeamJoinPrivateModalProps = {
  teamId: string;
};

const TeamJoinPrivateModal = ({ teamId }: TeamJoinPrivateModalProps) => {
  // 모달창 state
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <button type="button" onClick={() => setIsModalOpen(true)}>
        JOIN
      </button>
      <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Title mode={TITLE_MODE.SECTION_SUBTITLE}>JOIN THIS PRIVATE TEAM</Title>
        <Text>
          비공개 팀에 가입하기 위해선 비밀번호가 필요합니다! 초대장 확인 후,
          비밀번호를 입력해주세요.
        </Text>
        <TeamPasswordForm teamId={teamId} />
      </CommonModal>
    </div>
  );
};

export default TeamJoinPrivateModal;
