const { Router } = require('express');
const res = require('express/lib/response');

const Movie = require('../models/Movie');

module.exports = Router()
  .post('/', async (req, res) => {
    const movie = await Movie.insert({
      name: req.body.name,
      main_star: req.body.main_star,
    });
    res.json(movie);
  })

  .get('/', async (req, res) => {
    const movie = await Movie.getAll();
    res.json(movie);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.getById(id);

    res.json(movie);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await Movie.getById(id);
      const movie = await Movie.update(id, {
        name: req.body.name,
        main_star: req.body.main_star,
      });
      res.json(movie);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const movie = await Movie.delete(id);

    res.json(movie);
  });
