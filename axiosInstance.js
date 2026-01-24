
import axios from 'axios';

const api = axios.create({
 
  baseURL: 'http://192.168.1.158:3005/api/user', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;