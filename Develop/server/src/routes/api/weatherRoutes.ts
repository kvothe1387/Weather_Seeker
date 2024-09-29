import { Router } from 'express';
const router = Router();

import HistoryService from '../../service/historyService.js';

import WeatherService from '../../service/weatherService.js';


// TODO: POST Request with city name to retrieve weather data
router.post('/', (req, res) => {
  // TODO: GET weather data from city name
  const { city } = req.params;

  if (!city) {
    return res.status(400).json({ error: 'City name required' });
  }
  try {
    const weatherData = await WeatherService.getWeatherForCity(city);
    const cityWithId = await HistoryService.addCity(city);

    return res.json({ city: cityWithId, weather: weatherData });
  } catch (error) {
    console.error('Error processing request:', error);
    return res.status(500).json({ error: 'Faild to retrieve data or save history' });
  }
});

// TODO: GET search history
router.get('/history', async (_req, res) => {
  try {
    const history = await HistoryService.getCities();
    res.json(history);
  } catch (error) {
    console.error('Error getting history:', error);
    res.status(500).json({ error: 'Error getting search history' });
  }
});

// * BONUS TODO: DELETE city from search history
//router.delete('/history/:id', async (req, res) => {

//});

export default router;
