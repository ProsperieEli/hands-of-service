const { Router } = require('express');
const Animal = require('../models/Animal');

module.exports = Router()
  .post('/', async (req, res) => {
    const animal = await Animal.insert({
      type: req.body.type,
      species: req.body.species,
    });
    res.json(animal);
  })

  .get('/', async (req, res) => {
    const animal = await Animal.getAll();
    res.json(animal);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const animal = await Animal.getById(id);
    res.json(animal);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await Animal.getById(id);
      const animal = await Animal.update(id, {
        type: req.body.type,
        species: req.body.species,
      });
      res.json(animal);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const animal = await Animal.delete(id);
    res.json(animal);
  });
