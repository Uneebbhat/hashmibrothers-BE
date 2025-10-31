import { Types } from "mongoose";

// User Interface
export enum Role {
  user = "user",
  admin = "admin",
}

export interface IUser {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

export interface IUserDTO {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  role: Role;
}
