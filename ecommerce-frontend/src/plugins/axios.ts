import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
})

// Request interceptor - Add token to every request
instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        console.log('Axios interceptor - Token:', token)
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
            console.log('Authorization header set:', config.headers.Authorization)
        } else {
            console.log('No token found in localStorage')
        }
        return config
    },
    (error) => {
        console.error('Axios request error:', error)
        return Promise.reject(error)
    }
)

// Response interceptor - Handle 401 errors
instance.interceptors.response.use(
    (response) => {
        console.log('Axios response:', response.status, response.config.url)
        return response
    },
    (error) => {
        console.error('Axios response error:', error.response?.status, error.response?.data)
        
        if (error.response?.status === 401) {
            console.log('Unauthorized - Removing token')
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            window.location.href = '/login'
        }
        return Promise.reject(error)
    }
)

export default instance