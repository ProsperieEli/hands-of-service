const { Router } = require('express');
const Food = require('../models/Food');

module.exports = Router()
  .post('/', async (req, res) => {
    const food = await Food.insert({
      type: req.body.type,
      food_group: req.body.food_group,
    });
    res.json(food);
  })

  .get('/', async (req, res) => {
    const food = await Food.getAll();
    res.json(food);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const food = await Food.getById(id);

    res.json(food);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await Food.getById(id);
      const food = await Food.update(id, {
        type: req.body.type,
        food_group: req.body.food_group,
      });
      res.json(food);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const food = await Food.delete(id);

    res.json(food);
  });
