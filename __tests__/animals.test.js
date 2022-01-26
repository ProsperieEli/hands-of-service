const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Animal = require('../lib/models/Animal');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create an animal', async () => {
    const res = await request(app).post('/api/v1/animals').send({
      type: 'Persian',
      species: 'Cat',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      type: 'Persian',
      species: 'Cat',
    });
  });
  it('should get all animals', async () => {
    const animal = await Animal.insert({
      type: 'Fluffy Boy',
      species: 'Dog',
    });
    const res = await request(app).get('/api/v1/animals');
    expect(res.body).toEqual([animal]);
  });
  it('should get animal by id', async () => {
    const animal = await Animal.insert({
      type: 'Good boy',
      species: 'Dog',
    });
    const res = await request(app).get(`/api/v1/animals/${animal.id}`);
    expect(res.body).toEqual(animal);
  });

  it('should update an animal', async () => {
    const animal = await Animal.insert({
      type: 'Good boy',
      species: 'Dog',
    });
    const res = await request(app).patch(`/api/v1/animals/${animal.id}`).send({
      type: 'Hardy',
      species: 'Cat',
    });
    const existingAnimal = {
      id: expect.any(String),
      type: 'Hardy',
      species: 'Cat',
    };
    expect(res.body).toEqual(existingAnimal);
    expect(await Animal.getById(animal.id)).toEqual(existingAnimal);
  });
  it('should delete an animal', async () => {
    const animal = await Animal.insert({
      type: 'Felicia Hardy',
      species: 'Cat',
    });
    const res = await request(app).delete(`/api/v1/animals/${animal.id}`);
    expect(res.body).toEqual(animal);
    expect(await Animal.getById(animal.id)).toBeNull();
  });
});
