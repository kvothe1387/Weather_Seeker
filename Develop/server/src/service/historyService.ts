import { promises as fs } from 'fs';

// TODO: Define a City class with name and id properties
class City {
  constructor(public name: string, public id: string) { }
}

// TODO: Complete the HistoryService class
class HistoryService {

  private filePath = 'searchHistory.json';

  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data) as City[];
    } catch (error: string | any) {
      if (error.code === 'ENOENT') {
        return [];
      } throw error;
    }
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(cities));
  }
  // TODO: Define a getCities method that reads the cities from the searcfhHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities(): Promise<City[]> {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(city: string) {
    const cities = await this.read();
    const newCity = new City((cities.length + 1).toString(), city);
    cities.push(newCity);
    await this.write(cities);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  async removeCity(id: string) {
    const cities = await this.read();
    const index = cities.findIndex((city) => city.id === id);
    if (index === -1) {
      throw new Error('City not found');
    }
    cities.splice(index, 1);
    await this.write(cities);
  }
}

export default new HistoryService();
