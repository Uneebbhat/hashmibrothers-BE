import { Category, Role } from ".";

export interface ISignupBody {
  fullName: string;
  email: string;
  password: string;
  role: Role;
}

export interface ILoginBody {
  email: string;
  password: string;
}

export interface IForgotPasswordBody {
  email: string;
}

export interface IResetPassowrdBody {
  password: string;
}

export interface IProductBody {
  productName: string;
  productDescription: string;
  category: Category;
  quantity: string;
  inStock: number;
  price: number;
  // productImage: string;
}
