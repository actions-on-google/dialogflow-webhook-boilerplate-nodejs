const { baseUrl, jwt } = require('./auth');
const axios = require('axios');

axios.defaults.baseURL = baseUrl;

function setJWT(jwt) {
  axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}

module.exports = {
  api: axios,
  setJWT,
}
