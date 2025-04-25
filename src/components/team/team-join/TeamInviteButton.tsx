'use client';

import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import { useState } from 'react';
import TeamInviteModal from './TeamInviteModal';

type TeamInviteButtonProps = { id: string };

const TeamInviteButton = ({ id }: TeamInviteButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleInviteButtonClick = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <ActionButton
        mode={ACTIONBUTTON_MODE.ROUNDED_MD}
        onClick={handleInviteButtonClick}
      >
        팀 초대하기
      </ActionButton>

      {/* 팀 초대 모달 */}
      <TeamInviteModal
        id={id}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TeamInviteButton;
