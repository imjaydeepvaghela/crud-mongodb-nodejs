const errorMiddleware = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;
    res.status(statusCode).json({
      message: err.message,
      // Include stack trace only in development mode
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
  };
  
  module.exports = errorMiddleware;
  