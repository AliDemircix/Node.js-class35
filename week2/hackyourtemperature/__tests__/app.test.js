import app from '../server.js';
import supertest from 'supertest';

const request = supertest(app);

describe('POST /weather', () => {
  // Successful Cases
  test('should respond with a 200 status code for correct city name', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'leiden' });
    expect(response.statusCode).toBe(200);
  });
  test('should specify json in the content type header', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'leiden' });
    expect(response.headers['content-type']).toEqual(
      expect.stringContaining('text/html'),
    );
  });
  test('response has city name', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'leiden' });
    expect(response.body.cityName).toBeDefined();
  });
  test('response has city name as leiden', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'leiden' });
    expect(cityName).toBe('Leiden');
  });
  test('response has temperature', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'leiden' });
    expect(response.body.Temperature).toBeDefined();
  });
  // Error Cases
  test('should respond with a 400 status code if empty object send', async () => {
    const response = await request.post('/weather').send({});
    expect(response.statusCode).toBe(400);
  });
  test('should respond with a 404 status code for not found city name', async () => {
    const response = await request
      .post('/weather')
      .send({ cityName: 'asdlkadj' });
    expect(response.statusCode).toBe(404);
  });
});
