import { useEffect, useMemo } from "react";
import usePagination from "../../hooks/usePagination";
import { News as INews } from "../../redux/api";
import NewsItem from "./NewsItem";
import './News.scss';

const News: React.FC<{ data: INews[] }> = ({ data }) => {
  const { currentPage, totalPages, nextPage, prevPage, setPage, currentContent } = usePagination({
    contentPerPage: 5,
    count: data.length,
  });

  const paginatedData = useMemo(() => currentContent(data), [data, currentContent]);
  useEffect(() => setPage(1), [data])

  return (
    <>
      {paginatedData.map((newsItem, i) => (
        <NewsItem key={i} data={newsItem} />
      ))}
      <div className="pages">
        <button className={`page-buttons ${currentPage === 1 && 'disabled'}`} onClick={prevPage} disabled={currentPage === 1}>
          {'<'}
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button className={`page-buttons ${currentPage === i + 1 && 'active'}`} key={i} onClick={() => setPage(i + 1)}>
            {i + 1}
          </button>
        ))}
        <button className={`page-buttons ${currentPage === totalPages && 'disabled'}`} onClick={nextPage} disabled={currentPage === totalPages}>
          {'>'}
        </button>
      </div>

    </>
  );
};
export default News;