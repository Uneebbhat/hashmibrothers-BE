import { Response } from "express";

class ErrorHandler {
  static send(
    res: Response,
    statusCode: number,
    errorMessage: string,
    errorObject?: {}
  ) {
    return res.status(statusCode).json({
      success: false,
      statusCode,
      errorMessage,
      errorObject,
    });
  }
}

export default ErrorHandler;
