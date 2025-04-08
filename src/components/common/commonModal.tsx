'use client';

import { ReactNode } from 'react';
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
 *
 * @example
 *
 * ```tsx
 * <CommonModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
 *   <p>모달 내용</p>
 * </CommonModal>
 * ```
 */
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
