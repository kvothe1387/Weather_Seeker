
// TODO: Define a City class with name and id properties
class City {
  id: string;
  name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {

  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  // TODO: Define a read method that reads from the searchHistory.json file
  // private async read() {}
  private async read(): Promise<City[]> {
    const data = localStorage.getItem(this.filePath);
    return data ? JSON.parse(data) as City[] : [];
  }
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  // private async write(cities: City[]) {}
  private async write(cities: City[]): Promise<void> {
    localStorage.setItem(this.filePath, JSON.stringify(cities));
  }
  // TODO: Define a getCities method that reads the cities from the searcfhHistory.json file and returns them as an array of City objects
  // async getCities() {}
  async getCities(): Promise<City[]> {
    return await this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  // async addCity(city: string) {}
  async addCity(id: string, name: string): Promise<City> {
    const cities = await this.read();
    const newCity = new City(id, name);
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  // async removeCity(id: string) {}
  // async removeCity(id: string) {
  // const cities = await this.read();
  //const index = cities.findIndex((city) => city.id === id);
  //if (index === -1) {
  // throw new Error('City not found');
  //}
  //cities.splice(index, 1);
  //await this.write(cities);
  //}
}

export default new HistoryService('searchHistory.json');
