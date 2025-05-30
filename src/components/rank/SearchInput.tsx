'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CommonInputBar from '@/components/common/CommonInputBar';
import debounce from 'lodash-es/debounce';
import { CommonLoadingSpinner } from '../common/CommonLoadingSpinner';

type SearchInputProps = {
  placeholder: string;
};

export const SearchInput = ({ placeholder }: SearchInputProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  // 검색창 관리
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [isPending, setIsPending] = useTransition();

  {
    /* lodash.debounce 사용 */
  }
  // 디바운싱? 쓰로틀링?
  // lodash? use-debounce?
  const handleSearch = useMemo(
    () =>
      debounce((value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
          params.set('q', value); // 검색어 저장
        } else {
          params.delete('q'); // 검색어 없으면 q 제거 후 기본 목록
        }
        setIsPending(() => {
          // 새 URL 페이지 갱신
          router.push(`?${params.toString()}`);
        });
      }, 300),
    [searchParams, router],
  ); //debounce 300ms 지연

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    handleSearch(value);
  };

  const handleClear = () => {
    setSearchTerm('');
    handleSearch('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // debounce의 대기열을 무시하고 즉시 handleSearch를 실행
      handleSearch.flush();
    } else if (e.key === 'Escape') {
      handleClear();
    }
  };

  return (
    <div className="relative w-full">
      <CommonInputBar
        id="search"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {searchTerm && (
        <button
          onClick={handleClear}
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-sub-dark hover:text-dark-gray"
          aria-label="검색어 지우기"
        >
          ✕
        </button>
      )}
      {isPending && (
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
          <CommonLoadingSpinner size={20} />
        </div>
      )}
    </div>
  );
};
