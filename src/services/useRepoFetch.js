import React, { useEffect, useState } from 'react'
import axios from 'axios'

function UseRepoFetch(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [hasMore, setHasMore] = useState(false)
  const [reposData, setReposData] = useState([])
  useEffect(() => {
    setLoading(true)
    setError(false)
    axios(
      {
        method: 'GET',
        url: `https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc&page=${pageNumber}`,
      }
    ).then(response => {
      setReposData(prevState => {
        return [...prevState, ...response.data.items]
      })
      setHasMore(response.data.items.length > 0)
      setLoading(false)
    }).catch(e => {
      setError(true)
    })
  }, [pageNumber])
  return { loading, hasMore, reposData, error }
}

export default UseRepoFetch
