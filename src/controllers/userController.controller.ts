import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserDTO from "../dto/UserDTO.dto";
import User from "../models/UserModel.model";
import sendEmail from "../services/sendEmail";
import setCookies from "../helpers/setCookies";
import ErrorHandler from "../utils/ErrorHandler";
import generateToken from "../helpers/generateToken";
import ResponseHandler from "../utils/ResponseHandler";

import {
  ILoginBody,
  ISignupBody,
  IResetPassowrdBody,
  IForgotPasswordBody,
} from "../interface/body";
import { Request, Response } from "express";
import { FRONTEND_URL, JWT_SECRET } from "../config/constants";
import { welcomeEmail } from "../templates/emails/welcomeEmail";
import forgotPasswordEmail from "../templates/emails/forgotPasswordEmail";
import { decryptPassword, encryptPassword } from "../helpers/passwordHashing";

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fullName, email, password, role } = req.body as ISignupBody;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      ErrorHandler.send(res, 409, "User already exists");
    } else {
      const hashedPassword = await encryptPassword(password);

      const newUser = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role,
      });

      const token = generateToken(res, newUser);

      setCookies(res, token);

      const userDTO = new UserDTO(newUser);

      try {
        const emailTemplate = welcomeEmail(newUser.fullName);
        await sendEmail(
          newUser.email,
          emailTemplate.subject,
          emailTemplate.text
        );
      } catch (error: any) {
        console.error(`Failed to send welcome email: ${error.message}`);
      }

      ResponseHandler.send(
        res,
        201,
        "Account created successfully",
        userDTO,
        token
      );
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
    } else {
      ErrorHandler.send(res, 500, `Something went wrong`);
    }
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body as ILoginBody;

    const user = await User.findOne({ email });
    if (!user) {
      ErrorHandler.send(res, 404, "User not found");
    }

    const isPasswordCorrect = await decryptPassword(password, user?.password!);
    if (!isPasswordCorrect) {
      ErrorHandler.send(res, 400, "Invalid email or password");
    } else {
      const token = generateToken(res, user);

      setCookies(res, token);

      const userDTO = new UserDTO(user!);

      ResponseHandler.send(res, 200, "Login successful", userDTO!, token);
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
    } else {
      ErrorHandler.send(res, 500, `Something went wrong`);
    }
  }
};

export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    res.clearCookie("token");
    ResponseHandler.send(res, 200, "Logout successful");
  } catch (error: unknown) {
    if (error instanceof Error) {
      ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
    } else {
      ErrorHandler.send(res, 500, `Something went wrong`);
    }
  }
};

export const forgotPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email } = req.body as IForgotPasswordBody;

    const user = await User.findOne({ email });
    if (!user) {
      ErrorHandler.send(res, 404, "User not found");
    }

    const resetToken = generateToken(res, user);

    setCookies(res, resetToken);

    const resetLink = `${FRONTEND_URL}/reset-password/${resetToken}`;

    try {
      const emailTemplate = forgotPasswordEmail(user!.fullName!, resetLink);
      await sendEmail(user!.email!, emailTemplate.subject, emailTemplate.body);
    } catch (error: any) {
      console.error(`Failed to send reset password email: ${error.message}`);
    }

    ResponseHandler.send(
      res,
      200,
      "Password reset email sent successfully",
      resetLink
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
    } else {
      ErrorHandler.send(res, 500, `Something went wrong`);
    }
  }
};

export const resetPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { token } = req.params;
    const { password } = req.body as IResetPassowrdBody;

    if (!token) {
      ErrorHandler.send(res, 400, "Reset token is required");
      return;
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET!);
    } catch (err) {
      ErrorHandler.send(res, 400, "Invalid or expired reset token");
      return;
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      ErrorHandler.send(res, 404, "User not found");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    ResponseHandler.send(res, 200, "Password reset successfully");
  } catch (error: unknown) {
    if (error instanceof Error) {
      ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
    } else {
      ErrorHandler.send(res, 500, `Something went wrong`);
    }
  }
};
