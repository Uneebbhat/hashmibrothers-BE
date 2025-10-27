import { Types } from "mongoose";

// User Interface
export enum Role {
  user = "user",
  admin = "admin",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface IUserDTO {
  _id: Types.ObjectId;
  name: string;
  email: string;
  role: Role;
}
