import React from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';

const RepoInfo = ({ item, lastElement }) => (
  <div className="repo" ref={lastElement}>
    <div className="repo-avatar">
      <img src={item.owner.avatar_url} alt={item.owner.login} />
    </div>
    <div className="repo-info">
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <div className="repo-date">
        <span className="card">
          Stars:
          {item.stargazers_count}
        </span>
        <span className="card">
          Issues:
          {item.open_issues}
        </span>
        <Moment fromNow>{item.created_at}</Moment>
        <span>
          {' '}
          by
          {item.owner.login}
        </span>
      </div>
    </div>
  </div>
);

RepoInfo.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    stargazers_count: PropTypes.number,
    open_issues: PropTypes.number,
    created_at: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string,
    }).isRequired,
  }).isRequired,
  lastElement: PropTypes.func,
};

RepoInfo.defaultProps = {
  lastElement: null,
};

export default RepoInfo;
