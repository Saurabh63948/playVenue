// services/api.js
import axios from 'axios';

const api = axios.create({
 
  baseURL: 'http://10.88.82.104:3005/api/user', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;