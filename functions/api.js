const { baseUrl, jwt } = require('./auth');
const axios = require('axios');

axios.defaults.baseURL = baseUrl;
axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;

module.exports = axios;
