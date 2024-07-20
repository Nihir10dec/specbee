import { useState } from 'react';

interface UsePaginationProps {
  contentPerPage: number;
  count: number;
}

const usePagination = ({ contentPerPage, count }: UsePaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(count / contentPerPage);

  const nextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const setPage = (page: number) => {
    const pageNumber = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(pageNumber);
  };

  const currentContent = (items: any[]) => {
    const start = (currentPage - 1) * contentPerPage;
    const end = start + contentPerPage;
    return items.slice(start, end);
  };

  return {
    currentPage,
    totalPages,
    nextPage,
    prevPage,
    setPage,
    currentContent,
  };
};

export default usePagination;
