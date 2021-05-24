import { useState, useRef, useCallback, React } from 'react';
import Moment from "react-moment";
import RepoInfo from './components/RepoInfo';
import UseRepoFetch from './services/useRepoFetch';


function App() {

  const [pageNumber, setPageNumber] = useState(1)
  const {reposData, hasMore, loading, error} = UseRepoFetch(pageNumber)
  const observer = useRef();

  const lastRepoInfo = useCallback(element => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if(entries[0].isIntersecting && hasMore) {
        setPageNumber(prevState => prevState + 1)
      }
    })
    if (element) observer.current.observe(element)
  }, [loading, hasMore])


  console.log(reposData)
  return (
    <div className="App">
      <h1 class="title">Most Starred Repositories</h1>

        {
          reposData.map((item, index)=> {
            if (reposData.length === index) {
              return (
                <RepoInfo item={item} />
              )}else{
              return (
                <div className="repo" ref={lastRepoInfo}>
                  <div className="repo-avatar">
                    <img src={item.owner.avatar_url} alt={item.owner.login} />
                  </div>
                  <div className="repo-info">
                    <h1>{item.name}</h1>
                    <p>{item.description}</p>
                    <div className="repo-date">
                      <span className="card">Stars: {item.stargazers_count}</span>
                      <span className="card">Issues: {item.open_issues}</span>
                      <Moment fromNow>{item.created_at}</Moment>
                      <span> by {item.owner.login}</span>
                    </div>
                  </div>
                </div>
              )
            }
          }
          )
        }
        <div>{loading && <h1>Loading...</h1>}</div>
        <div>{error && 'Error'}</div>
        </div>
  )}

export default App;

