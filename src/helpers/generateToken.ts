import jwt from "jsonwebtoken";

import { Response } from "express";
import { JWT_SECRET } from "../config/constants";
import ErrorHandler from "../utils/ErrorHandler";

const generateToken = (res: Response, payload: any) => {
  if (!JWT_SECRET) {
    ErrorHandler.send(res, 500, "JWT Secret is not defined.");
  }

  const token = jwt.sign(
    {
      userId: payload._id,
      fullName: payload.fullName,
      userEmail: payload.email,
      role: payload.role,
    },
    JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  return token;
};

export default generateToken;
