const {Schema, model} = require('mongoose');

const stringType = {
  type: String,
  required: true,
};

const numberType = {
  type: Number,
  required: true,
};

const booleanType = {
  type: Boolean,
  default: false,
};

const carsSchema = new Schema({
  brand: stringType,
  model: {...stringType, unique: true},
  year: numberType,
  description: stringType,
  countryCode: stringType,
  country: stringType,
  price: stringType,
  featured: booleanType,
  specifications: {
    mileage: numberType,
    engine: numberType,
    bhp: numberType,
    seating: numberType,
    transmission: stringType,
    fuel_type: stringType,
    serviceCost: numberType,
  },
});

module.exports = model('car', carsSchema);
