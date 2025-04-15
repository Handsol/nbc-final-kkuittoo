import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from '@/components/ui/pagination';

type Props = {
  currentPage: number;
  setPage: (page: number) => void;
  totalPages: number;
};

const HomePage = ({ currentPage, setPage, totalPages }: Props) => {
  const handlePrev = () => currentPage > 1 && setPage(currentPage - 1);
  const handleNext = () => currentPage < totalPages && setPage(currentPage + 1);

  return (
    <nav aria-label="홈페이지 소개 페이지네이션">
      <Pagination>
        <PaginationContent className="gap-2">
          <PaginationItem>
            <button
              onClick={handlePrev}
              className=" text-white hover:text-sub transition"
            >
              <FaAngleLeft />
            </button>
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <PaginationItem key={num}>
              <PaginationLink
                isActive={num === currentPage}
                onClick={() => setPage(num)}
                className={`px-3 py-2 border rounded-md transition font-medium
                  ${
                    num === currentPage
                      ? 'bg-white text-main'
                      : 'border-white text-white hover:bg-white hover:text-main'
                  }`}
              >
                {num}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <button
              onClick={handleNext}
              className=" text-white hover:text-sub transition"
            >
              <FaAngleRight />
            </button>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </nav>
  );
};

export default HomePage;
