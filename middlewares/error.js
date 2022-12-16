const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;
  if (statusCode == 200) {
    statusCode = 400;
  }
  console.log(statusCode, err.message);
  res.status(statusCode);

  return res.json({
    success: false,
    error: err.message,
  });
};

module.exports = {
  errorHandler,
};
