/**
 * 1. Chuck Norris programs do not accept input
 *
 * `GET` a random joke inside the function, using the API: http://www.icndb.com/api/
 * (use `node-fetch`) and print it to the console.
 * Make use of `async/await` and `try/catch`
 *
 * Hints
 * - To install node dependencies you should first initialize npm
 * - Print the entire response to the console to see how it is structured.
 */
import express from 'express';
import fetch from 'node-fetch';
function printChuckNorrisJoke() {
  // YOUR CODE GOES IN HERE
  const app = express();
  app.get('/', async (req, res) => {
    try {
      const response = await fetch(
        'https://api.icndb.com/jokes/random/?firstName=Ali&lastName=Demirci',
      );
      const body = await response.json();

      console.log(body);
      res.json(body);
    } catch (error) {
      console.log(error);
    }
  });
  app.listen(3000, () => {
    console.log('Server Running');
  });
}

printChuckNorrisJoke();
