import { defineStore } from 'pinia'
import axios from '@/plugins/axios'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: localStorage.getItem('token') || null,
        loading: false,
    }),

    getters: {
        isAuthenticated: (state) => {
            const token = localStorage.getItem('token')
            const isAuth = !!token || !!state.token
            console.log('isAuthenticated check:', { token, stateToken: state.token, isAuth })
            return isAuth
        },
        userName: (state) => {
            const user = state.user || JSON.parse(localStorage.getItem('user') || 'null')
            return user?.name || 'Guest'
        },
        userData: (state) => {
            return state.user || JSON.parse(localStorage.getItem('user') || 'null')
        }
    },

    actions: {
        async fetchCurrentUser() {
            try {
                const response = await axios.get('/user')
                this.user = response.data
                localStorage.setItem('user', JSON.stringify(response.data))
                return { success: true, user: response.data }
            } catch (error: any) {
                return {
                    success: false,
                    message: error.response?.data?.message || 'Failed to load user'
                }
            }
        },

        async login(email: string, password: string) {
            this.loading = true
            try {
                const response = await axios.post('/login', { email, password })
                console.log('Login response:', response.data)
                
                // Store token and user
                this.token = response.data.token
                this.user = response.data.user
                
                // Save to localStorage
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                
                console.log('Token saved:', localStorage.getItem('token'))
                console.log('User saved:', localStorage.getItem('user'))
                
                return { success: true }
            } catch (error: any) {
                console.error('Login error:', error)
                return { 
                    success: false, 
                    message: error.response?.data?.message || 'Login failed' 
                }
            } finally {
                this.loading = false
            }
        },

        async register(userData: any) {
            this.loading = true
            try {
                const response = await axios.post('/register', userData)
                console.log('Register response:', response.data)
                
                // Store token and user
                this.token = response.data.token
                this.user = response.data.user
                
                // Save to localStorage
                localStorage.setItem('token', response.data.token)
                localStorage.setItem('user', JSON.stringify(response.data.user))
                
                console.log('Token saved:', localStorage.getItem('token'))
                console.log('User saved:', localStorage.getItem('user'))
                
                return { success: true }
            } catch (error: any) {
                console.error('Register error:', error)
                return { 
                    success: false, 
                    message: error.response?.data?.message || 'Registration failed' 
                }
            } finally {
                this.loading = false
            }
        },

        async logout() {
            try {
                await axios.post('/logout')
            } catch (error) {
                console.error('Logout error:', error)
            }
            
            this.token = null
            this.user = null
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            
            console.log('Logged out, token removed')
        },
    },
})
