const { baseUrl, jwt } = require('./auth');
const axios = require('axios');

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;

module.exports = axios;

const { host, portal } = require('./config');

function makeUrl(url) {
  return host + url;
}

module.exports = {
  get: (url) => {
    console.log('url', makeUrl(url));
    return axios.get(makeUrl(url));
  },

  post: (url, data) => {
    console.log('url_post', makeUrl(url));
    return axios.post(makeUrl(url), data);
  }
}
