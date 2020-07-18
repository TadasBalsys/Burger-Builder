import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-c7c41.firebaseio.com/',
});

export default instance;
