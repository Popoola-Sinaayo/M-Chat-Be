const errorHandler = (err, req, res, next) => {
  console.log(err);
  return res.status(400).json({ message: "error", data: err });
};

module.exports = errorHandler;
