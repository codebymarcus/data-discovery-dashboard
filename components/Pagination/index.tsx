import { PaginationProps } from './types'
import { Pagination as PaginationWrapper, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'


const Pagination = (props: PaginationProps) => {
  const {
    totalPages,
    currentPage,
    maxVisiblePages = 5,
    onPageChange
  } = props;

  const generatePagination = () => {
    const pagination = [];

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pagination.push(i);
      }

      return pagination;
    }

    pagination.push(1);

    const startPage = Math.max(currentPage - 1, 2);
    const endPage = Math.min(currentPage + 1, totalPages - 1);

    // Add an ellipsis after the first page if the startPage is greater than 2
    if (startPage > 2) {
      pagination.push("...");
    }

    // Add the range of visible pages around the current page
    for (let i = startPage; i <= endPage; i++) {
      pagination.push(i);
    }

    // Add an ellipsis before the last page if the endPage is less than totalPages - 1
    if (endPage < totalPages - 1) {
      pagination.push("...");
    }

    // Always show the last page
    pagination.push(totalPages);

    return pagination;
  }

  const handleArrowNavClick = (type: 'previous' | 'next') => () => {
    if (type === 'previous' && currentPage > 1) {
      onPageChange(currentPage - 1);
    }

    if (type === 'next' && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  }

  return (
    <PaginationWrapper>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" onClick={handleArrowNavClick('previous')} />
        </PaginationItem>
        {generatePagination().map((pageNumber, index) => (
          <PaginationItem key={index}>
            {pageNumber === "..." ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink href="#" onClick={() => onPageChange(pageNumber as number)} isActive={pageNumber === currentPage}>{pageNumber}</PaginationLink>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href='#' onClick={handleArrowNavClick('next')} />
        </PaginationItem>
      </PaginationContent>
    </PaginationWrapper>
  )
}

export default Pagination