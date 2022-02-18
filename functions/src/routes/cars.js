const router = require('express').Router();

const {
  fetchAllCars,
  fetchAllBrands,
  searchCars,
  fetchCar,
} = require('../controllers/car');
const validate = require('../middlewares/validator');
const carSchema = require('../schemas/car');

router
  .get('/', validate(carSchema.fetchCars, 'query'), fetchAllCars)
  .get('/search', validate(carSchema.searchCars, 'query'), searchCars)
  .get('/brands', fetchAllBrands)
  .get('/:id', validate(carSchema.fetchCar, 'params'), fetchCar);

module.exports = router;
