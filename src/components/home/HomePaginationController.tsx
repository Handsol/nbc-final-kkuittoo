'use client';

import { useState } from 'react';
import HomePagination from './HomePagination';
import HomeBioContent from './HomeBioContent';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { PaginationArrowButton } from './HomePageItems';

const TOTAL_PAGES = 3;

const HomePaginationController = () => {
  const [page, setPage] = useState(1);

  const handlePrev = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < TOTAL_PAGES && setPage(page + 1);

  return (
    <article className="flex flex-col items-center gap-4 w-full">
      <div className="relative flex items-center justify-center w-full">
        {/* 왼쪽 화살표 버튼 */}
        <PaginationArrowButton
          direction="prev"
          onClick={handlePrev}
          disabled={page === 1}
          icon={<FaAngleLeft size={24} />}
        />

        {/* 메인 영역 */}
        <section
          aria-label={`홈페이지 소개 ${page}페이지`}
          className="w-full max-w-[700px] h-[350px] md:h-[450px] rounded-2xl flex items-center justify-center mx-2"
        >
          <HomeBioContent page={page} />
        </section>

        {/* 오른쪽 화살표 버튼 */}
        <PaginationArrowButton
          direction="next"
          onClick={handleNext}
          disabled={page === TOTAL_PAGES}
          icon={<FaAngleRight size={24} />}
        />
      </div>

      {/* 페이지네이션 */}
      <HomePagination
        currentPage={page}
        setPage={setPage}
        totalPages={TOTAL_PAGES}
      />
    </article>
  );
};

export default HomePaginationController;
