import axios from "axios";

const baseUrl = 'https://backend-recipes-bootcamps-tribe.onrender.com/api/recipes'

const AxiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 20000,
  headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
  }
});

AxiosInstance.interceptors.request.use(
  config => {
      const access_token = JSON.parse(localStorage.getItem('idToken'));
      if (access_token) {
          config.headers['Authorization'] = access_token
      }
      return config;
  },
  error => {
      Promise.reject(error.response || error.message)
  }
);

AxiosInstance.interceptors.response.use(
  response => {
      return response;
  },
  async error => {
      let originalRequest = error.config;
      return Promise.reject(error.response || error.message);
  })

export default AxiosInstance