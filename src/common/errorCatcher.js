const errorCatcher = fc => async (req, res, next) => {
  try {
    return await fc(req, res);
  } catch (err) {
    return next(err);
  }
};

module.exports = errorCatcher;
