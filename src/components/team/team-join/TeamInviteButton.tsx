'use client';

import ActionButton from '@/components/common/button/ActionButton';
import { ACTIONBUTTON_MODE } from '@/constants/mode.constants';
import { useState } from 'react';
import TeamInviteModal from './TeamInviteModal';
import CommonTooltip from '@/components/common/CommonTooltip';
import { TOOLTIP_MESSAGE } from '@/constants/tooltip-message.constants';

type TeamInviteButtonProps = { id: string };

const TeamInviteButton = ({ id }: TeamInviteButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleInviteButtonClick = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      <CommonTooltip message={TOOLTIP_MESSAGE.TEAM.INVITE}>
        <ActionButton
          mode={ACTIONBUTTON_MODE.ROUNDED_MD_REVERSE}
          onClick={handleInviteButtonClick}
        >
          팀 초대하기
        </ActionButton>
      </CommonTooltip>

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
