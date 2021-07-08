import axios from 'axios'

const URL_BASE = "http://localhost:3001/"
const api = axios.create({
    baseURL: URL_BASE,
})

export default api