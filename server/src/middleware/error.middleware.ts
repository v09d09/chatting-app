import { Request, Response, NextFunction } from "express";
import HttpsException from "../utils/exceptions/http.exception";

function errorMiddleware(
  error: HttpsException,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  res.status(status).send({ status, message });
}

export default errorMiddleware;
