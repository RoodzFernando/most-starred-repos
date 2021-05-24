import React from 'react'
import Moment from "react-moment";

const RepoInfo = ({ref, item}) => {
  return (
    <div className="repo">
      <div className="repo-avatar">
        <img src={item.owner.avatar_url} alt={item.owner.login} />
      </div>
      <div className="repo-info">
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <div className="repo-date">
          <span>{item.stargazers_count}</span> |
          <span>{item.open_issues}</span> |
          <Moment fromNow>{item.created_at}</Moment>
          <span> by {item.owner.login}</span>
        </div>
      </div>
    </div>
  )
}

export default RepoInfo
