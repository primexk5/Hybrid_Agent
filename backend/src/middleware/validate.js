const ApiError = require("../utils/ApiError");

// Validate a request property (default body) against a Joi schema. Coerces and
// strips unknown keys, then replaces the source with the sanitized value.
module.exports = (schema, property = "body") => (req, res, next) => {
  const { value, error } = schema.validate(req[property], {
    abortEarly: false,
    stripUnknown: true,
    convert: true,
  });
  if (error) {
    return next(ApiError.badRequest("validation failed", error.details.map((d) => d.message)));
  }
  req[property] = value;
  next();
};
