import axios from 'axios';

export default function fetchData() {
  axios({
      method: 'GET',
      url: 'https://api.github.com/search/repositories?q=created:>2017-10-22&sort=stars&order=desc'
    }).then(data => (data.data.items))
}
