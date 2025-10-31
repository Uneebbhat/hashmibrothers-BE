import { Types } from "mongoose";
import { IUserDTO, Role } from "../interface/index";

class UserDTO {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  role: Role;
  constructor(user: IUserDTO) {
    this._id = user._id;
    this.fullName = user.fullName;
    this.email = user.email;
    this.role = user.role;
  }
}

export default UserDTO;
