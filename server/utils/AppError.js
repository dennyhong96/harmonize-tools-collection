class AppError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true; // For testing

    // Constructing new AppError does not polute stack trace
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
