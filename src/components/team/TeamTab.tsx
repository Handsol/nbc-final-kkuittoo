'use client';

import { getTabButtonClass } from '@/styles/tabButtonStyles';
import { useState, ReactNode } from 'react';

type MobileTeamTabsProps = {
  membersTab: ReactNode;
  chatTab: ReactNode;
};

export const MobileTeamTabs = ({
  membersTab,
  chatTab,
}: MobileTeamTabsProps) => {
  const [selectedTab, setSelectedTab] = useState<'members' | 'chat'>('members');

  return (
    <div className="md:hidden mt-4">
      <div className="flex border-b border-light-gray px-4">
        <button
          className={getTabButtonClass(selectedTab === 'members')}
          onClick={() => setSelectedTab('members')}
        >
          팀원 목록
        </button>
        <button
          className={getTabButtonClass(selectedTab === 'chat')}
          onClick={() => setSelectedTab('chat')}
        >
          팀 채팅
        </button>
      </div>
      <div className="px-4">
        {selectedTab === 'members' ? membersTab : chatTab}
      </div>
    </div>
  );
};
