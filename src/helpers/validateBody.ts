import ErrorHandler from "../utils/ErrorHandler";

import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import { log } from "winston";

export const validateBody =
  (schema: ZodSchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedData = await schema.parseAsync(req.body);
      req.body = validatedData;
      next();
    } catch (error: any) {
      // console.log(error.errors?.map((err: any) => err.message));

      ErrorHandler.send(
        res,
        400,
        "Validation error",
        error.errors?.map((err: any) => err.message) || [error.message]
      );
    }
  };
