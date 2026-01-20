// // services/api.js
// import axios from 'axios';

// const api = axios.create({
 
//   baseURL: 'http://192.168.1.158:3005/api/user', 
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// export default api;

// services/api.js
import axios from 'axios';

const api = axios.create({
  // Naya Home IP jo Metro dikha raha hai
  baseURL: 'http://10.229.72.104:3005/api/user', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;