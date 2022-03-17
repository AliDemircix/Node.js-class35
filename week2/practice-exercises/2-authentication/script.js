/**
 * 2. Authentication
 *
 * Using node-fetch make an authenticated request to https://restapiabasicauthe-sandbox.mxapps.io/api/books
 * Print the response to the console. Use async-await and try/catch.
 *
 * Hints:
 * - for basic authentication the username and password need to be base64 encoded
 */
import express from 'express';
import fetch from 'node-fetch';

function printBooks() {
  const app = express();

  app.get('/books', async (req, res) => {
    try {
      const response = await fetch(
        'https://restapiabasicauthe-sandbox.mxapps.io/api/books',
        {
          headers: { Authorization: 'Basic YWRtaW46aHZnWDhLbFZFYQ==' },
        },
      );
      const body = await response.json();
      res.json(body);
    } catch (error) {
      console.log(error);
      res.status(404).send('An error occurred while fetching data');
    }
  });
  app.listen(3000, () => console.log('server running'));
}

printBooks();
