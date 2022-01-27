const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Movie = require('../lib/models/Movie');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create movie', async () => {
    const res = await request(app).post('/api/v1/movies').send({
      name: 'Fast & Furious',
      main_star: 'Paul Walker',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Fast & Furious',
      main_star: 'Paul Walker',
    });
  });
  it('should get all movies', async () => {
    const movie = await Movie.insert({
      name: 'Fast and Furious',
      main_star: 'Paul Walker',
    });
    const res = await request(app).get('/api/v1/movies');
    expect(res.body).toEqual([movie]);
  });
  it('should get movie by id', async () => {
    const movie = await Movie.insert({
      name: 'Fast and Furious',
      main_star: 'Paul Walker',
    });
    const res = await request(app).get(`/api/v1/movies/${movie.id}`);

    expect(res.body).toEqual(movie);
  });
  it('should update movie', async () => {
    const movie = await Movie.insert({
      name: 'Batman',
      main_star: 'Christian Bale',
    });
    const res = await request(app).patch(`/api/v1/movies/${movie.id}`).send({
      name: 'Superman',
      main_star: 'Henry Cavill',
    });
    const existingMovie = {
      id: expect.any(String),
      name: 'Superman',
      main_star: 'Henry Cavill',
    };
    expect(res.body).toEqual(existingMovie);
    expect(await Movie.getById(movie.id)).toEqual(existingMovie);
  });
  it('should delete', async () => {
    const movie = await Movie.insert({
      name: 'Suicide Squad',
      main_star: 'Will Smith',
    });
    const res = await request(app).delete(`/api/v1/movies/${movie.id}`);
    expect(res.body).toEqual(movie);
    expect(await Movie.getById(movie.id)).toBeNull();
  });
});
