'use client';
import { Z_INDEX } from '@/constants/z-index.constants';
import { ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { MdClose } from 'react-icons/md';

type CommonModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  mode?: 'common' | 'parallel';
};

/**
 * 공통 모달 컴포넌트입니다.
 *
 * 화면 중앙에 모달을 띄우며, 외부 영역(배경)을 클릭하면 닫히도록 설정했습니다.
 * 모달 내부를 클릭하면 닫히지 않도록 클릭 이벤트를 주었습니다.
 *
 * @component
 *
 * @param {boolean} isOpen - 기본값은 `false`이며, `true`일 때만 모달이 보입니다.
 * @param {() => void} onClose - 모달을 닫을 때 실행할 함수입니다. (예: 상태 초기화)
 * @param {ReactNode} children - 모달 내부에 렌더링할 콘텐츠입니다. (예: 상세 정보, 폼 등)
 * @param {'common' | 'parallel'} mode - 모달 모드 분기 (기본: common)
 * @example
 *
 * ```tsx
 * <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
 *   <p>모달 내용</p>
 * </CommonModal>
 * ```
 */

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
      className={`fixed inset-0 z-${Z_INDEX.MODAL} bg-black bg-opacity-60 flex justify-center items-center px-4 `}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl w-full max-w-sm md:max-w-lg p-6 max-h-[90vh] overflow-auto scrollbar-hide shadow-xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="모달 닫기"
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          <MdClose />
        </button>
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body,
  );
};
