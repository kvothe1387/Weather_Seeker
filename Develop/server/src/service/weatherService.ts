import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}


// TODO: Define a class for the Weather object
class Weather {
  date: number;
  temp: number;
  description: string;
}


// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  constructor(baseURL: string, apiKey: string, cityName) {
    this.baseURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}";
    this.apiKey = process.env.WEATHER_API_KEY;
    this.cityName = cityName;
  }

  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}
  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}

  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  buildWeatherQuery(coordinates: Coordinates): string {
    const { lat, lon } = coordinates;
    return ${ this.baseURL }/weather?apiKey=${ this.apiKey }&lat=${ lat }&lon=${ lon };
  }

  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  async fetchAndDestructureLocationData() {
    const query = this.buildGeocodeQuery();
    const locationData = await this.fetchLocationData(query);
    const coordinates = this.destructureLocationData(locationData);
    return coordinates;
  }

  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}
  async fetchWeatherData(coordinates: Coordinates) {
    const query = this.buildWeatherQuery(coordinates);
    const response = await fetch(query);
    const data = await response.json();
    return data;
  }

  // TODO: Build parseCurrentWeather method
  // private parseCurrentWeather(response: any) {}
  parseCurrentWeather(response: any) {
    const currentWeather = {
      date: response.dt,
      temp: response.main.temp,
      description: response.weather[0].description,
    };
    return currentWeather
  }

  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    const forecastArray = [];
    for (let i = 1; i < weatherData.length; i++) {
      const forecast = {
        date: weatherData[i].dt_txt,
        temp: weatherData[i].main.temp,
        description: weatherData[i].weather[0].description,
      };
      forecastArray.push(forecast);
    }
    return forecastArray;
  }

  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity() {
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    const forecastArray = this.buildForecastArray(currentWeather, weatherData);
    return forecastArray
  }
}

export default new WeatherService();
