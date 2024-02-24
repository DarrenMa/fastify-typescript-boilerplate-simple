import supertest from 'supertest';
import app from '../../src/app';
import UserService from '../../src/services/UserService';
import UserRepository from '../../src/datalayer/UserRepository';

let testUserId: number | null = null;

beforeAll(() => app.ready());
afterAll(() => app.close());

describe('POST `/user` route', () => {
  test('with valid data', async () => {
    const user = { name: 'minime', password: 'qwertt123!@' };

    const response = await supertest(app.server)
      .post('/user')
      .send(user);

    expect(response.status).toBe(200);
    expect(response.body.id).toBeGreaterThan(0);

    testUserId = response.body.id;
  });

  test('with failure', async () => {
    // Create a mock function for saveUser that throws an error
    const mockSaveUser = jest.fn().mockImplementation(() => {
      throw new Error('Database error');
    });

    // Create an instance of UserService and replace its saveUser method with the mock function
    const mockDB: any = {};
    const userService = new UserService(new UserRepository(mockDB));
    const spy = jest.spyOn(userService, 'saveUser').mockImplementation(mockSaveUser);

    const user = { name: 'John Doe', email: 'john.doe@example.com', password: 'password' };

    const response = await supertest(app.server)
      .post('/user')
      .send(user);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to save user' });

    // Clean up: Restore the original saveUser method
    spy.mockRestore();
  });
});

describe('PUT `/user` route', () => {
  test('with valid data', async () => {
    const user = { id: testUserId, name: 'minimeUpdated', password: 'qwertt123!@' };

    const response = await supertest(app.server)
      .put('/user')
      .send(user);

    expect(response.status).toBe(200);
  });
});

describe('GET `/user` route', () => {
  test('with valid id', async () => {
    const user = { id: testUserId, name: 'minimeUpdated' };

    const response = await supertest(app.server)
      .get('/user')
      .query({ id: testUserId });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(user));
  });

  test('with invalid id', async () => {
    const response = await supertest(app.server)
      .get('/user')
      .query({ id: 'abc' });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Failed to get user' });
  });
});

describe('DELETE `/user` route', () => {
  test('with valid id', async () => {
    const response = await supertest(app.server)
      .delete(`/user/${testUserId}`);

    expect(response.status).toBe(200);
  });
});

