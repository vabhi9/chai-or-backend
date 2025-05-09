class ApiError extends Error {
  constructor(
    statusCode,
    message = "Something went Wrong!",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null; // Khud se Padho
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
      // Isko bhi pdh le
    }
  }
}

export {ApiError}
