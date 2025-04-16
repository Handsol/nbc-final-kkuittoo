import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { Pagination, PaginationContent } from '@/components/ui/pagination';
import { PaginationArrowButton, PaginationNumberButton } from './HomePageItems';

type Props = {
  currentPage: number;
  setPage: (page: number) => void;
  totalPages: number;
};

const HomePagination = ({ currentPage, setPage, totalPages }: Props) => {
  const handlePrev = () => currentPage > 1 && setPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setPage(currentPage + 1);

  return (
    <nav aria-label="홈페이지 소개 페이지네이션">
      <Pagination>
        <PaginationContent className="gap-2">
          <PaginationArrowButton
            direction="prev"
            icon={<FaAngleLeft />}
            onClick={handlePrev}
          />
          {[...Array(totalPages)].map((_, idx) => {
            const pageNum = idx + 1;

            return (
              <PaginationNumberButton
                key={pageNum}
                page={pageNum}
                currentPage={currentPage}
                onClickPage={setPage}
              />
            );
          })}
          <PaginationArrowButton
            direction="next"
            icon={<FaAngleRight />}
            onClick={handleNext}
          />
        </PaginationContent>
      </Pagination>
    </nav>
  );
};

export default HomePagination;
