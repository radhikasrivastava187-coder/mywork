/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface HourlyData {
  time: string;
  temp: number;
  condition: "sunny" | "cloudy" | "rainy" | "stormy" | "snowy";
}

export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  condition: "sunny" | "cloudy" | "rainy" | "stormy" | "snowy";
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  uvIndex: number;
  hourly: HourlyData[];
}

const generateHourly = (baseTemp: number): HourlyData[] => {
  return Array.from({ length: 24 }, (_, i) => {
    const hour = (new Date().getHours() + i) % 24;
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    // Slight variation in temp throughout the day
    const tempVariation = Math.sin((hour / 24) * Math.PI * 2) * 5;
    return {
      time: `${hour12}${ampm}`,
      temp: Math.round(baseTemp + tempVariation),
      condition: i % 5 === 0 ? "cloudy" : i % 8 === 0 ? "rainy" : "sunny"
    };
  });
};

export const MOCK_WEATHER: Record<string, WeatherData> = {
  "Mumbai": {
    city: "Mumbai",
    country: "India",
    temp: 32,
    condition: "sunny",
    description: "Hazy Sunshine",
    humidity: 65,
    windSpeed: 12,
    feelsLike: 35,
    uvIndex: 8,
    hourly: generateHourly(32)
  },
  "Delhi": {
    city: "Delhi",
    country: "India",
    temp: 38,
    condition: "sunny",
    description: "Clear Sky",
    humidity: 25,
    windSpeed: 15,
    feelsLike: 40,
    uvIndex: 10,
    hourly: generateHourly(38)
  },
  "Lucknow": {
    city: "Lucknow",
    country: "India",
    temp: 36,
    condition: "sunny",
    description: "Partly Cloudy",
    humidity: 30,
    windSpeed: 10,
    feelsLike: 37,
    uvIndex: 9,
    hourly: generateHourly(36)
  },
  "Panaji": {
    city: "Panaji",
    country: "India",
    temp: 30,
    condition: "rainy",
    description: "Light Rain",
    humidity: 80,
    windSpeed: 18,
    feelsLike: 33,
    uvIndex: 4,
    hourly: generateHourly(30)
  },
  "Dehradun": {
    city: "Dehradun",
    country: "India",
    temp: 26,
    condition: "cloudy",
    description: "Overcast",
    humidity: 55,
    windSpeed: 8,
    feelsLike: 27,
    uvIndex: 5,
    hourly: generateHourly(26)
  },
  "London": {
    city: "London",
    country: "United Kingdom",
    temp: 18,
    condition: "rainy",
    description: "Showers",
    humidity: 75,
    windSpeed: 20,
    feelsLike: 16,
    uvIndex: 3,
    hourly: generateHourly(18)
  },
  "Paris": {
    city: "Paris",
    country: "France",
    temp: 22,
    condition: "cloudy",
    description: "Mostly Cloudy",
    humidity: 60,
    windSpeed: 12,
    feelsLike: 23,
    uvIndex: 4,
    hourly: generateHourly(22)
  }
};
