import axios from 'axios';

const api = axios.create({
    baseURL: 'https://qr-menu-app-1.onrender.com',  // Updated Base URL for the deployed backend
});

export default api;
