import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [repoData, setRepoData] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc'
    }).then(data => setRepoData( data.data.items ))
    console.log(repoData)
  }, [])
  return (
    <div className="App">
      <h1>Most Starred Repositories</h1>
      <div className="container">
        {
          repoData.map(item => (
            <div className="repo">
              <div className="repo-avatar">
                <img src={item.owner.avatar_url} alt={item.owner.login} />
              </div>
              <div className="repo-info">
                <h1>{item.name}</h1>
                <p>{item.description}</p>
                <span>{item.stargazers_count}</span> |
                <span>{item.open_issues}</span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
