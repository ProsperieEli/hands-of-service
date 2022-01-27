const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Food = require('../lib/models/Food');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('it should create a food', async () => {
    const res = await request(app).post('/api/v1/foods').send({
      type: 'Apple',
      food_group: 'fruit',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      type: 'Apple',
      food_group: 'fruit',
    });
  });
  it('should get all foods', async () => {
    const food = await Food.insert({
      type: 'Produced Food',
      food_group: 'Pizza',
    });
    const res = await request(app).get('/api/v1/foods');
    expect(res.body).toEqual([food]);
  });
  it('should get foods by id', async () => {
    const food = await Food.insert({
      type: 'Cereal',
      food_group: 'breakfast',
    });
    const res = await request(app).get(`/api/v1/foods/${food.id}`);
    expect(res.body).toEqual(food);
  });
  it('should update foods', async () => {
    const food = await Food.insert({
      type: 'Banana',
      food_group: 'fruit',
    });
    const res = await request(app).patch(`/api/v1/foods/${food.id}`).send({
      type: 'Strawberry',
      food_group: 'fruit',
    });
    const existingFood = {
      id: expect.any(String),
      type: 'Strawberry',
      food_group: 'fruit',
    };
    expect(res.body).toEqual(existingFood);
    expect(await Food.getById(food.id)).toEqual(existingFood);
  });

  it('should delete foods', async () => {
    const food = await Food.insert({
      type: 'Banana',
      food_group: 'fruit',
    });
    const res = await request(app).delete(`/api/v1/foods/${food.id}`);

    expect(res.body).toEqual(food);
    expect(await Food.getById(food.id)).toBeNull();
  });
});
