import Image from 'next/image';
import React from 'react';

const HowToUseButton = () => {
  // 임시 설정! 사이즈랑 위치만 보려고 올려둔거라
  // 아이콘 어떤식으로 사용할지 확정 후 수정하겠습니다!
  return (
    <div className="mt-[100px]">
      <Image
        src="/assets/images/buttons/SealQuestion.png"
        alt="How to use?"
        width={32}
        height={32}
      />
    </div>
  );
};

export default HowToUseButton;
