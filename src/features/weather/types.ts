export type CurrentWeather = {
  name: string;
  dt: number;
  weather: { icon: string; description: string }[];
  main: { temp: number; humidity: number };
  wind: { speed: number; deg: number };
  visibility: number;
};

export type ForecastItem = {
  dt: number;
  main: { temp_min: number; temp_max: number; temp: number };
  weather: { icon: string; description: string }[];
};

export type ForecastResponse = {
  list: ForecastItem[];
};
