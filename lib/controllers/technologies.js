const { Router } = require('express');
const Technology = require('../models/Technology');

module.exports = Router()
  .post('/', async (req, res) => {
    const tech = await Technology.insert({
      price: req.body.price,
      brand: req.body.brand,
    });
    res.json(tech);
  })

  .get('/', async (req, res) => {
    const tech = await Technology.getAll();
    res.json(tech);
  })

  .get('/:id', async (req, res) => {
    const { id } = req.params;
    const tech = await Technology.getById(id);

    res.json(tech);
  })

  .patch('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      await Technology.getById(id);
      const tech = await Technology.update(id, {
        price: req.body.price,
        brand: req.body.brand,
      });
      res.json(tech);
    } catch (error) {
      next(error);
    }
  })

  .delete('/:id', async (req, res) => {
    const { id } = req.params;
    const tech = await Technology.delete(id);

    res.json(tech);
  });
