import { Category, IProduct } from "../interface";
import mongoose, { Model, Schema } from "mongoose";

const ProductModel: Schema<IProduct> = new Schema(
  {
    productName: {
      type: String,
      required: [true, "Product name is required"],
      minlength: [2, "Product name must be at least 2 characters long"],
      maxlength: [50, "Product name cannot exceed 50 characters"],
    },
    productDescription: {
      type: String,
      required: [true, "Product description is required"],
      minlength: [2, "Product description must be at least 2 characters long"],
      maxlength: [200, "Product description cannot exceed 200 characters"],
    },
    category: {
      type: String,
      enum: Object.values(Category),
      required: [true, "Category is required"],
    },
    quantity: {
      type: String,
      required: [true, "Quantity is required"],
    },
    inStock: {
      type: String,
      required: [true, "In stock quantity is required"],
    },
    price: {
      type: String,
      required: [true, "Price is required"],
    },
    productImage: {
      type: String,
    },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.model<IProduct>(
  "Product",
  ProductModel
);

export default Product;
