import supertest from 'supertest';
import app from '../../src/app';

let testUserId: number | null = null;

beforeAll(() => app.ready());
afterAll(() => app.close());

describe('POST `/users` route', () => {
  test('with valid data', async () => {
    const user = { name: 'minime', password: 'qwertt123!@' };

    const response = await supertest(app.server)
      .post('/users')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body.id).toBeGreaterThan(0);

    testUserId = response.body.id;
  });

  test('with failure', async () => {
    const user = { name: 'John Doe', email: 'john.doe@example.com', password: 'password' };

    const response = await supertest(app.server)
      .post('/users')
      .send(user);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to save user' });
  });
});

describe('PUT `/users` route', () => {
  test('with valid data', async () => {
    const user = { id: testUserId, name: 'minimeUpdated', password: 'qwertt123!@' };

    const response = await supertest(app.server)
      .put(`/users/${testUserId}`)
      .send(user);

    expect(response.status).toBe(200);
  });
});

describe('GET `/users` route', () => {
  test('with valid id', async () => {
    const user = { id: testUserId, name: 'minimeUpdated' };

    const response = await supertest(app.server)
      .get(`/users/${testUserId}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(user));
  });

  test('with invalid id', async () => {
    const response = await supertest(app.server)
      .get('/users/abc');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to get user' });
  });
});

describe('DELETE `/users` route', () => {
  test('with valid id', async () => {
    const response = await supertest(app.server)
      .delete(`/users/${testUserId}`);

    expect(response.status).toBe(200);
  });
});

