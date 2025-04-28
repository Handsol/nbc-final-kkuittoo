'use client';

import { useState } from 'react';
import { CommonModal } from '@/components/common/CommonModal'; // 경로는 실제 위치에 맞춰 조정
import Image from 'next/image';
import { HowToUseModal } from './HowToUseModal';

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
        <span className="text-body-sm">사용 방법</span>
      </button>

      {/* 모달 */}
      <CommonModal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <HowToUseModal onClose={() => setIsOpen(false)} />
      </CommonModal>
    </>
  );
}
