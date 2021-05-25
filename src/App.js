import {
  useState, useRef, useCallback, React,
} from 'react';
import RepoInfo from './components/RepoInfo';
import UseRepoFetch from './services/useRepoFetch';

function App() {
  const [pageNumber, setPageNumber] = useState(1);
  const {
    reposData, hasMore, loading, error,
  } = UseRepoFetch(pageNumber);
  const observer = useRef();

  const lastRepoInfo = useCallback((element) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber((prevState) => prevState + 1);
      }
    });
    if (element) observer.current.observe(element);
  }, [loading, hasMore]);

  return (
    <div className="App">
      <h1 className="title">Most Starred Repositories</h1>

      {
          reposData.map((item, index) => {
            if (reposData.length === index) {
              return (
                <RepoInfo item={item} />
              );
            }
            return (
              <RepoInfo key={item.id} item={item} lastElement={lastRepoInfo} />
            );
          })
        }
      <div>{loading && <h1>Loading...</h1>}</div>
      <div>{error && 'Error'}</div>
    </div>
  );
}

export default App;
