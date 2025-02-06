class DevErr extends Error {
  constructor(devErr, message, statusCode) {
    super(message);

    if (devErr) {
      this.devErr = devErr;
    }

    this.statusCode = statusCode;
    this.status = statusCode >= 200 && statusCode < 400 ? "Fail" : "Error";

    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default DevErr;
