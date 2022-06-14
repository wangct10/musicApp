import axios from 'axios';
let service = axios.create({
  baseURL: 'https://musicappbackground.vercel.app/',
  timeout: 5000
})
export default service
