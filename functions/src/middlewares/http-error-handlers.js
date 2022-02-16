const errors = require('../config/errors');

exports.notFoundHandler = (req, res, next) => {
  next({
    ...errors[404],
    data: 'Invalid Route',
  });
};

exports.genericErrorHandler = (err, req, res, next) => {
  res.status(err.code || 500).json({ error: err });
};
