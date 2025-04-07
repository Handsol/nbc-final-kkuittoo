'use client';

import { ReactNode } from 'react';

type CommonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export const CommonModal = ({
  isOpen = false, // 기본값 설정
  onClose,
  children,
}: CommonModalProps) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-60 flex justify-center items-center"
      onClick={onClose} // 배경 클릭 시 닫힘
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl p-8 max-w-[30%] max-h-[70%] w-full h-auto overflow-auto shadow-xl"
      >
        {children}
      </div>
    </div>
  );
};
