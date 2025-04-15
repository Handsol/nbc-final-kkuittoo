import { ReactNode } from 'react';
import { ButtonHTMLAttributes } from 'react';

// 제목과 글자
type TextProps = {
  children: string | ReactNode;
};

export const HomeTitleLg = ({ children }: TextProps) => {
  return (
    <p className="font-dohyeon text-xl text-white text-center pt-1">
      {children}
    </p>
  );
};

export const HomeTitleSm = ({ children }: TextProps) => {
  return (
    <p className="font-pretendard text-md text-light-gray text-center">
      {children}
    </p>
  );
};

// 페이지네이션 앞, 뒤페이지 이동 버튼

type ArrowProps = {
  direction: 'prev' | 'next';
  onClick: () => void;
  icon: React.ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const PaginationArrowButton = ({
  direction,
  onClick,
  icon,
  className = '',
  ...props
}: ArrowProps) => {
  return (
    <button
      aria-label={direction === 'prev' ? '이전 페이지' : '다음 페이지'}
      onClick={onClick}
      className={`text-white hover:text-sub transition disabled:opacity-40 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};

// 페이지네이션 숫자 버튼

type NumberProps = {
  page: number;
  currentPage: number;
  onClickPage: (page: number) => void;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const PaginationNumberButton = ({
  page,
  currentPage,
  onClickPage,
  className = '',
  ...props
}: NumberProps) => {
  const isActive = page === currentPage;

  return (
    <button
      onClick={() => onClickPage(page)}
      aria-pressed={isActive}
      className={`w-3 h-3 rounded-full border transition
      ${isActive ? 'bg-white border-white' : 'border-white'} 
      ${className}`}
      {...props}
    />
  );
};
