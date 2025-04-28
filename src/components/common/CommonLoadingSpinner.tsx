'use client';

import { LoaderCircle } from 'lucide-react';

interface CommonLoadingSpinnerProps {
  width?: number;
  height?: number;
  className?: string;
}

/**
 * 공통 로딩 스피너 컴포넌트
 * width와 height만 전달받아 크기를 조절.
 */
export default function CommonLoadingSpinner({
  width = 20,
  height = 20,
  className = '',
}: CommonLoadingSpinnerProps) {
  return (
    <LoaderCircle
      className={`animate-spin text-medium-gray ${className}`}
      size={Math.max(width, height)}
    />
  );
}
