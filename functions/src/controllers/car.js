const errors = require('../config/errors');
const Car = require('../models/car');

exports.fetchAllCars = async (req, res, next) => {
  try {
    let cars;
    const { limit, page, filter, filterValue, featured } = req.query;
    if (featured) {
      cars = await Car.find({ featured: true });
    } else if (filter) {
      cars = await Car.find({ [filter]: filterValue })
        .limit(limit)
        .skip(limit * (page - 1));
    } else {
      cars = await Car.find()
        .limit(limit)
        .skip(limit * (page - 1));
    }
    res.json({ totalCars: cars.length, cars });
  } catch (error) {
    next(error);
  }
};

exports.fetchAllBrands = async (req, res, next) => {
  try {
    const cars = await Car.find();
    const brands = [];
    for (const car of cars) {
      if (!brands.some(({ brand }) => brand === car.brand)) {
        brands.push({ _id: car._id, brand: car.brand });
      }
    }
    res.json({ totalBrands: brands.length, brands });
  } catch (error) {
    next(error);
  }
};

exports.searchCars = async (req, res, next) => {
  try {
    const searchResults = await Car.find({
      $text: { $search: req.query.searchText },
    });
    res.json({ totalResults: searchResults.length, cars: searchResults });
  } catch (error) {
    next(error);
  }
};

exports.fetchCar = async (req, res, next) => {
  try {
    const car = await Car.findOne({ _id: req.params.id });
    if (!car) {
      throw {
        ...errors[404],
        data: `Unable to find the details with the given id - ${req.params.id}`,
      };
    }
    res.json(car);
  } catch (error) {
    next(error);
  }
};
