import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
});


axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');

    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;
}, (err) => {
    return Promise.reject(err);
});

export default axiosInstance;