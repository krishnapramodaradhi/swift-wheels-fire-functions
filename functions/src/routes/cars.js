const router = require('express').Router();

const { fetchAllCars } = require('../controllers/car');

router.get('/', fetchAllCars).get('/search').get('/:id');

module.exports = router;
