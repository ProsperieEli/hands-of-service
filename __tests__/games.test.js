const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Game = require('../lib/models/Game');

describe('backend routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a game', async () => {
    const res = await request(app).post('/api/v1/games').send({
      title: 'WWE2k22',
      price: 70,
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      title: 'WWE2k22',
      price: 70,
    });
  });
  it('should get all games', async () => {
    const game = await Game.insert({
      title: 'Cyberpunk 2077',
      price: 60,
    });
    const res = await request(app).get('/api/v1/games');
    expect(res.body).toEqual([game]);
  });
  it('should get by game', async () => {
    const game = await Game.insert({
      title: 'Ghost of Tsushima',
      price: 70,
    });
    const res = await request(app).get(`/api/v1/games/${game.id}`);
    expect(res.body).toEqual(game);
  });

  it('should update game', async () => {
    const game = await Game.insert({
      title: 'Spider-Man',
      price: 50,
    });
    const res = await request(app).patch(`/api/v1/games/${game.id}`).send({
      title: 'Spider-Man',
      price: 60,
    });
    const expectedgame = {
      id: expect.any(String),
      title: 'Spider-Man',
      price: 60,
    };
    expect(res.body).toEqual(expectedgame);
    expect(await Game.getById(game.id)).toEqual(expectedgame);
  });

  it('should delete', async () => {
    const game = await Game.insert({
      title: 'Spider-Man',
      price: 60,
    });
    const res = await request(app).delete(`/api/v1/games/${game.id}`);

    expect(res.body).toEqual(game);
    expect(await Game.getById(game.id)).toBeNull();
  });
});
