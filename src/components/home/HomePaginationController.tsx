'use client';

import { useState } from 'react';
import HomeBioPage from './HomePage';
import HomeBioPageItem from './HomeBioContent';

const TOTAL_PAGES = 3;

const HomePaginationController = () => {
  const [page, setPage] = useState(1);

  return (
    <article className="flex flex-col items-center gap-4">
      <section
        aria-label={`홈페이지 소개 ${page}페이지`}
        className="w-[700px] h-[500px] border-2 border-white rounded-2xl flex items-center justify-center"
      >
        <HomeBioPageItem page={page} />
      </section>

      <HomeBioPage
        currentPage={page}
        setPage={setPage}
        totalPages={TOTAL_PAGES}
      />
    </article>
  );
};

export default HomePaginationController;
