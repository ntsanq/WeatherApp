import axios from 'axios';

const baseURL = import.meta.env.VITE_OPENWEATHER_API_URL;
const defaultParams = {
  appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
  units: 'metric', // °C
};

const createHttp = (path: string) =>
  axios.create({
    baseURL: `${baseURL}${path}`,
    params: defaultParams,
  });

export const http = createHttp('/data/2.5');
export const geoHttp = createHttp('/geo/1.0');
