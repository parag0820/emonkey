import axios from 'axios';
import BASE_URL from './BaseUrl';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
});

// REQUEST INTERCEPTOR
API.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error),
);

// RESPONSE INTERCEPTOR
API.interceptors.response.use(
  response => response,
  error => {
    // Handle Token Expired / Unauthorized
    if (error?.response?.status === 401) {
      console.log('Session expired. Redirecting to login...');
      // Optionally clear token
    }

    return Promise.reject(error);
  },
);

export default API;
