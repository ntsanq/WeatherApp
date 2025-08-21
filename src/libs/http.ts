import axios from 'axios';

export const http = axios.create({
  baseURL: import.meta.env.VITE_OPENWEATHER_API_URL,
  params: {
    appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
    units: 'metric', // °C
  },
});
