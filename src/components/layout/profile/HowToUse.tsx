'use client';

import { useState } from 'react';
import { CommonModal } from '@/components/common/CommonModal';
import Image from 'next/image';
import { HowToUseModal } from './HowToUseModal';
import Text from '@/components/common/Text';

export default function HowToUse() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 버튼 영역 */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
        aria-label="사용 방법 보기"
      >
        <Image
          src="/assets/images/buttons/SealQuestion.png"
          alt="How to use"
          width={30}
          height={30}
        />
        <Text className="text-body-sm">사용 방법</Text>
      </button>

      {/* 모달 */}
      <CommonModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <HowToUseModal />
      </CommonModal>
    </>
  );
}
