'use client';

import { useState, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CommonInputBar from '@/components/common/CommonInputBar';
import { debounce } from 'lodash';

interface SearchInputProps {
  placeholder: string;
}

export const SearchInput = ({ placeholder }: SearchInputProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [isPending, setIsPending] = useTransition();

  const handleSearch = debounce((value: string) => {
    console.log('검색 트리거:', value);

    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }
    setIsPending(() => {
      router.push(`?${params.toString()}`);
    });
  }, 300);

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
          className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label="검색어 지우기"
        >
          ✕
        </button>
      )}
      {isPending && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm">
          검색 중...
        </div>
      )}
    </div>
  );
};
