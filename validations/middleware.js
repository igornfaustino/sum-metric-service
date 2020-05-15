const middleware = (schema, property) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[property]);
    if (!error) {
      req[property] = value;
      next();
    } else {
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      res.status(422).json({ error: message });
    }
  };
};

module.exports = middleware;
