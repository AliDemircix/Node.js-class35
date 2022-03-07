import express from 'express';
import fetch from 'node-fetch';
import { engine } from 'express-handlebars';
import { keys } from './sources/keys.js';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.engine('handlebars', engine({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/weather', async (req, res) => {
  try {
    const { cityName } = req.body;
    if (!cityName) {
      res.sendStatus(400);
      return;
    }
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${keys.API_KEY}`,
      {
        method: 'post',
        body: cityName,
        headers: { 'Content-Type': 'application/json' },
      },
    );

    const data = await response.json();
    res.statusCode = 200;
    res.render('index', {
      weatherText: Math.floor(data.main.temp),
      cityName: data.name,
      iconUrl: `http://openweathermap.org/img/w/${data.weather[0].icon}.png`,
      description: data.weather[0].description,
      coord: `Lon: ${data.coord.lon} Lat: ${data.coord.lat}`,
    });
  } catch (error) {
    const message = { weatherText: 'City is not found!' };
    res.status(404).json(message);
  }
});

app.listen(PORT, (error) => {
  if (error) console.error(error);
  console.log(`Server is running port:${PORT}`);
});
export default app;
