'use client';

import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';

type CommonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  mode?: 'common' | 'parallel';
};

export const CommonModal = ({
  isOpen,
  onClose,
  children,
}: CommonModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-black bg-opacity-80 flex justify-center items-center px-4 isolate"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl w-full max-w-sm md:max-w-lg p-6 max-h-[80vh] overflow-auto shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="모달 닫기"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          <MdClose />
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
};
