import axios from 'axios'

export default axios.create({
  baseURL: 'http://localhost:8000/api/title' || 
           "http://127.0.0.1:8000/api/title"
})