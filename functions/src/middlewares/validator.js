const errors = require('../config/errors');

const validate = (schema, property) => (req, res, next) => {
  try {
    const { error } = schema.validate(req[property]);
    const valid = error == null;
    if (!valid) {
      throw {
        ...errors[400],
        data: error.details.map((x) => x.message),
      };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validate;
