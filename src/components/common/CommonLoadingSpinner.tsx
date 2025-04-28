'use client';

import clsx from 'clsx';
import { LoaderCircle } from 'lucide-react';

type CommonLoadingSpinnerProps = {
  size: number;
  className?: string;
};

/**
 * 공통 로딩 스피너 컴포넌트
 * size prop 하나로 spinner의 가로/세로 크기 지정
 */
export const CommonLoadingSpinner = ({
  size,
  className,
}: CommonLoadingSpinnerProps) => {
  return (
    <LoaderCircle
      className={clsx('animate-spin text-medium-gray', className)}
      size={size}
    />
  );
};
