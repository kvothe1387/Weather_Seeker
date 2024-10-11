
import dotenv from 'dotenv';
dotenv.config();

// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}

// TODO: Define a class for the Weather object
class Weather {
  temp: string;
  wind: string;
  humidity: string;
  city: string;
  date: string;
  icon: string;
  iconDes: string;

  constructor(
    temp: string,
    wind: string,
    humidity: string,
    city: string,
    date: string,
    icon: string,
    iconDes: string
  ) {
    this.temp = temp;
    this.wind = wind;
    this.humidity = humidity;
    this.city = city;
    this.date = date;
    this.icon = icon;
    this.iconDes = iconDes;
  }
}


// TODO: Complete the WeatherService class
class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties
  baseURL: string;
  apiKey: string;
  cityName: string;

  constructor(baseURL: string, apiKey: string, cityName: string) {
    this.baseURL = baseURL;
    this.apiKey = apiKey;
    this.cityName = cityName;
  }

  // TODO: Create fetchLocationData method
  // private async fetchLocationData(query: string) {}
  private async fetchLocationData(query: string) {
    const getCoordinates = await this.buildGeocodeQuery(query);
    const location = await fetch(getCoordinates);
    return location.json();
  }

  // TODO: Create destructureLocationData method
  // private destructureLocationData(locationData: Coordinates): Coordinates {}

  private destructureLocationData(locationData: Coordinates[]): Coordinates {
    const { lat, lon } = locationData[0];
    return { lat, lon };
  }

  // TODO: Create buildGeocodeQuery method
  // private buildGeocodeQuery(): string {}

  private async buildGeocodeQuery(query: string): Promise<string> {
    const geoQuery = `${this.baseURL}/geo/1.0/direct?q=${query}&limit=5&appid=${this.apiKey}`;
    return geoQuery;
  }

  // TODO: Create buildWeatherQuery method
  // private buildWeatherQuery(coordinates: Coordinates): string {}
  private buildWeatherQuery(coordinates: Coordinates): string {
    const weatherQuery = `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${this.apiKey}&units=imperial`;
    return weatherQuery;
  }


  // TODO: Create fetchAndDestructureLocationData method
  // private async fetchAndDestructureLocationData() {}
  private async fetchAndDestructureLocationData() {
    const locationData = await this.fetchLocationData(this.cityName);
    return this.destructureLocationData(locationData);
  }

  // TODO: Create fetchWeatherData method
  // private async fetchWeatherData(coordinates: Coordinates) {}

  private async fetchWeatherData(coordinates: Coordinates) {
    const weatherData = await fetch(this.buildWeatherQuery(coordinates));
    return weatherData.json();
  }

  // TODO: Complete buildForecastArray method
  // private buildForecastArray(currentWeather: Weather, weatherData: any[]) {}
  private buildForecastArray(weatherData: any[]) {
    const forecast = [];
    for (let i = 0; i < weatherData.length; i += 8) {
      const temp = weatherData[i].main.temp;
      const wind = weatherData[i].wind.speed;
      const humidity = weatherData[i].main.humidity;
      const city = this.cityName;
      const date = new Date(weatherData[i].dt * 1000).toDateString();
      const icon = weatherData[i].weather[0].icon;
      const iconDes = weatherData[i].weather[0].description;
      forecast.push({ temp, wind, humidity, city, date, icon, iconDes });
    }
    return forecast;
  }


  // TODO: Complete getWeatherForCity method
  // async getWeatherForCity(city: string) {}
  async getWeatherForCity(city: string): Promise<Weather[]> {
    this.cityName = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    if (!coordinates) {
      throw new Error('Failed to fetch location data.');
    }

    const weather = await this.fetchWeatherData(coordinates);
    if (!weather) {
      throw new Error('Failed to fetch weather data.');
    }
    console.log(weather);

    const cityForecast = this.buildForecastArray(weather.list);
    return cityForecast;
  }

}

export default new WeatherService(`${process.env.API_BASE_URL}`, `${process.env.API_KEY}`, '');
