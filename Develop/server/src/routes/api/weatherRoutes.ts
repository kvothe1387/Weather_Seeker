import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';
import WeatherService from '../../service/weatherService.js';


// TODO: POST Request with city name to retrieve weather data
router.post('/', async (req: Request, res: Response) => {
  // TODO: GET weather data from city name
  const city = req.body.city; try { const weather = await WeatherService.getWeatherForCity(); res.json(weather); }
  catch (error) { res.status(500).json({ error: 'Failed to get weather data' }); }

  // TODO: save city to search history
  try { await HistoryService.addCity(city); }
  catch (error) { console.log('Failed to save city to search history'); }

});

// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
  try { const cities = await HistoryService.getCities(); res.json(cities); }
  catch (error) { res.status(500).json({ error: 'Failed to get search history' }); }
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  const id = req.params.id; try { await HistoryService.deleteCity(id); res.json({ message: 'City deleted from search history' }); }
  catch (error) { res.status(500).json({ error: 'Failed to delete city from search history' }); }
});

export default router;
