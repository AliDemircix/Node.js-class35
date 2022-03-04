/**
 * 3: Party time
 *
 * After reading the documentation make a request to https://reservation100-sandbox.mxapps.io/rest-doc/api
 * and print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - make sure to use the correct headers and http method in the request
 */
import express from 'express';
import fetch from 'node-fetch';
function makeReservation() {
  const url = 'https://reservation100-sandbox.mxapps.io/api/reservations';
  const app = express();
  app.use(express.json());
  app.post('/', async (req, res) => {
    try {
      const sendBody = {
        name: req.body.name,
        numberOfPeople: req.body.numberOfPeople,
      };
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendBody),
      });
      const data = await response.json();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  });
  app.listen(3000, () => console.log('Server Running'));
}

makeReservation();
