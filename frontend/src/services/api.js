import axios from 'axios';
//Chamadas HTTP
const api = axios.create({
  baseURL: 'http://localhost:3000'
});

export default api;