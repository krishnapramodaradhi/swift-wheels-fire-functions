const Joi = require('joi');
const {
  Types: { ObjectId },
} = require('mongoose');

const schemas = {
  fetchCars: Joi.alternatives().conditional(
    Joi.object({ featured: Joi.boolean().equal(true) }),
    {
      then: Joi.object({
        featured: Joi.boolean().required(),
      }),
      otherwise: Joi.object({
        limit: Joi.number().required().min(1),
        page: Joi.number().required().min(1),
        filter: Joi.string().optional(),
        filterValue: Joi.string().when('filter', {
          is: Joi.exist(),
          then: Joi.string().required(),
          otherwise: Joi.optional(),
        }),
      }),
    }
  ),
  searchCars: Joi.object({
    searchText: Joi.string().trim().required(),
  }),
  fetchCar: Joi.object({
    id: Joi.string()
      .trim()
      .required()
      .custom((value, helpers) => {
        if (!ObjectId.isValid(value))
          return helpers.message('Please pass a valid mongodb id.');

        return value;
      }),
  }),
};

module.exports = schemas;
