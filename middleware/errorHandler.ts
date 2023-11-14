import { Request, Response, NextFunction } from "express";
import { MongooseError } from "mongoose";

type CustomError = Error & { message: string; statusCode?: number };

const errHandler = (
  err: CustomError | MongooseError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err.name === "ValidationError") {
    return res.status(400).json({ msg: err.message });
  } else if (err instanceof Error) {
    const errorType = err as CustomError;
    return res.status(errorType.statusCode!).json({ msg: errorType.message });
  }
  res.status(500).json({ msg: "internal server error" });
};

export default errHandler;
