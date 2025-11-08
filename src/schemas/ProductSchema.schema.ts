import { z } from "zod";
import { Category } from "../interface";

const ProductSchema = z.object({
  productName: z.string().min(2).max(50),
  productDescription: z.string().min(2).max(200),
  category: z.enum(Object.values(Category)),
  quantity: z.string(),
  inStock: z.string(),
  price: z.string(),
  productImage: z.string().url().optional(),
});

export default ProductSchema;
