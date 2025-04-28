'use client';

import Image from 'next/image';
import { useState } from 'react';
import HomePagination from '@/components/home/HomePagination';
import { PaginationArrowButton } from '@/components/home/HomePageItems';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { TITLE_MODE } from '@/constants/mode.constants';
import Title from '@/components/common/Title';
import { HOW_TO_USE_IMAGES } from '@/constants/how-to-use.constants';

type HowToUseModalProps = {
  onClose: () => void;
};

const TOTAL_PAGES = HOW_TO_USE_IMAGES.length;

export const HowToUseModal = ({ onClose }: HowToUseModalProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < TOTAL_PAGES && setCurrentPage(currentPage + 1);

  const currentImage = HOW_TO_USE_IMAGES[currentPage - 1];

  return (
    <div className="relative w-full flex flex-col items-center justify-between min-h-[400px] md:min-h-[520px]">
      {/* 이미지 + 타이틀 영역 */}
      <div
        aria-label={`사용 방법 ${currentPage}페이지`}
        className="flex flex-col items-center w-full max-w-[400px] min-h-[400px]"
      >
        {/* 타이틀 */}
        <div className="text-xl font-bold text-left w-full">
          <Title mode={TITLE_MODE.SECTION_TITLE}>{currentImage.title}</Title>
        </div>

        {/* 이미지 */}
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={400}
          height={400}
          className="object-contain p-5 md:p-10"
        />
      </div>

      {/* 화살표 + 페이지네이션 */}
      <div className="flex items-center justify-center gap-4 absolute bottom-2 md:bottom-4">
        <PaginationArrowButton
          direction="prev"
          onClick={handlePrev}
          disabled={currentPage === 1}
          icon={<FaAngleLeft size={24} />}
        />
        <HomePagination
          currentPage={currentPage}
          setPage={setCurrentPage}
          totalPages={TOTAL_PAGES}
        />
        <PaginationArrowButton
          direction="next"
          onClick={handleNext}
          disabled={currentPage === TOTAL_PAGES}
          icon={<FaAngleRight size={24} />}
        />
      </div>
    </div>
  );
};
