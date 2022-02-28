import express from 'express';
// import exphbs from 'express-handlebars';
// import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => res.json({ msg: 'Hello from backend to frontend' }));
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Post Weather
app.post('/weather', (req, res) => {
  const cityName = {
    cityName: req.body.cityName,
  };

  if (!cityName.cityName) {
    return res.status(400).json({ msg: 'Please include a city name' });
  }

  res.json(cityName);
});
