function errorHandler(error, request, response, next) {
  return response.status(error.status || 500).json({
    message: error.message || "Oops! Something went wrong."
  });
}
module.exports = errorHandler;
