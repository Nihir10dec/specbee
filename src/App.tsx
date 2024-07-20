import { useMemo, useState } from 'react';
import './App.scss'
import { useGetNewsQuery } from './redux/api'
import Filters from './components/Filters';
import LoadingSpinner from './components/Loader';
import NoResultsFound from './components/NoResults';
import News from './components/News';

function App() {
  const { data: news, isLoading, isFetching } = useGetNewsQuery();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('Date');
  const [sortDirection, setSortDirection] = useState('desc')

  const { categories, authors } = useMemo(() => {
    const categories = [...new Set(news?.map((n) => n.source))];
    const authors = [...new Set(news?.map((n) => n.author))];

    return { categories, authors }
  }, [news]);

  const filteredSortedData = useMemo(() => {
    let filteredSortedData = news?.slice() ?? [];
    !!selectedAuthors.length && (filteredSortedData = filteredSortedData?.filter((n) => selectedAuthors.includes(n.author)));

    !!selectedCategories.length && (filteredSortedData = filteredSortedData?.filter((n) => selectedCategories.includes(n.source)));

    filteredSortedData?.sort((a, b) => {
      if (sortBy === 'Date') {
        if (sortDirection === 'desc') return new Date(a.date) - new Date(b.date);
        else return new Date(b.date) - new Date(a.date);
      } else {

        if (sortDirection === 'desc') {
          if (a.title < b.title) {
            return 1;
          }
          if (a.title > b.title) {
            return -1;
          }
          return 0;
        }
        else {
          if (a.title < b.title) {
            return -1;
          }
          if (a.title > b.title) {
            return 1;
          }
          return 0;
        }
      }
    });

    return filteredSortedData;
  }, [selectedAuthors, selectedCategories, news, sortBy, sortDirection]);

  const onSort = (label: string, direction: 'asc' | 'desc') => {
    setSortBy(label);
    setSortDirection(direction);
  };

  return (
    <div className='parent'>
      <div className='filters'>
        <Filters categories={categories} setSelectedCategories={setSelectedCategories}
          authors={authors} setSelectedAuthors={setSelectedAuthors} onSort={onSort} />
      </div>
      <div className="spacer"></div>
      <div className='main'>
        {(isFetching || isLoading) && <LoadingSpinner />}
        {!(isFetching || isLoading) && !filteredSortedData?.length && <NoResultsFound />}
        {!(isFetching || isLoading) && !!filteredSortedData?.length && <News data={filteredSortedData} />}
      </div>
    </div>
  )
}

export default App
