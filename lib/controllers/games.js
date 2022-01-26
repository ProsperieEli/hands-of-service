const { Router } = require('express');
const Game = require('../models/Game');

module.exports = Router()
  .post('/', async (req, res) => {
    const game = await Game.insert({
      title: req.body.title,
      price: req.body.price,
    });
    res.json(game);
  })

  .get('/', async (req, res) => {
    const game = await Game.getAll();

    res.json(game);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const game = await Game.getById(id);

    res.json(game);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await Game.getById(id);
      const game = await Game.update(id, {
        title: req.body.title,
        price: req.body.price,
      });
      res.json(game);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const game = await Game.delete(id);

    res.json(game);
  });
