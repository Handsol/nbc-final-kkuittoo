import { Pagination, PaginationContent } from '@/components/ui/pagination';
import { PaginationNumberButton } from './HomePageItems';

type Props = {
  currentPage: number;
  setPage: (page: number) => void;
  totalPages: number;
};

const HomePagination = ({ currentPage, setPage, totalPages }: Props) => {
  return (
    <nav aria-label="홈페이지 소개 페이지네이션">
      <Pagination>
        <PaginationContent className="gap-2">
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
        </PaginationContent>
      </Pagination>
    </nav>
  );
};

export default HomePagination;
