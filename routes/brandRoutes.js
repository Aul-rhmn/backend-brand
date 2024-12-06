const express = require('express');
const Brand = require('../models/Brand');
const router = express.Router();

router.post('/', async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Brand name is required');
  }

  const newBrand = new Brand({ name });
  await newBrand.save();
  res.status(201).json(newBrand);
});

module.exports = router;
