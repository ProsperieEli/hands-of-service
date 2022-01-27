const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Technology = require('../lib/models/Technology');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create tech', async () => {
    const res = await request(app).post('/api/v1/technologies').send({
      price: 100,
      brand: 'Android',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      price: 100,
      brand: 'Android',
    });
  });
  it('should list all tech', async () => {
    const tech = await Technology.insert({
      price: 250,
      brand: 'Apple',
    });
    const res = await request(app).get('/api/v1/technologies');
    expect(res.body).toEqual([tech]);
  });

  it('shoudl list a tech', async () => {
    const tech = await Technology.insert({
      price: 250,
      brand: 'Apple',
    });
    const res = await request(app).get(`/api/v1/technologies/${tech.id}`);
    expect(res.body).toEqual(tech);
  });
  it('should update a tech', async () => {
    const tech = await Technology.insert({
      price: 250,
      brand: 'Samsung',
    });
    const res = await request(app)
      .patch(`/api/v1/technologies/${tech.id}`)
      .send({
        price: 150,
        brand: 'Galaxy',
      });
    const existingTech = {
      id: expect.any(String),
      price: 150,
      brand: 'Galaxy',
    };
    expect(res.body).toEqual(existingTech);
    expect(await Technology.getById(tech.id)).toEqual(existingTech);
  });

  it('should delete tech', async () => {
    const tech = await Technology.insert({
      price: 250,
      brand: 'Apple',
    });
    const res = await request(app).delete(`/api/v1/technologies/${tech.id}`);
    expect(res.body).toEqual(tech);
    expect(await Technology.getById(tech.id)).toBeNull();
  });
});
