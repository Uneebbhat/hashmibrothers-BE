import NodeCache from "node-cache";
import ErrorHandler from "../utils/ErrorHandler";
import Product from "../models/ProductModel.model";
import ResponseHandler from "../utils/ResponseHandler";

import { Request, Response } from "express";
import { IProductBody } from "../interface/body";
import path from "path";
import cloudinaryUpload from "../services/cloudinaryUpload";

const nodecache = new NodeCache();

export const addProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      productName,
      productDescription,
      category,
      quantity,
      inStock,
      price,
    } = req.body as IProductBody;

    const profilePic = req.file;

    let productImageUrl;

    if (profilePic) {
      const filePath = path.resolve(profilePic.path);
      // console.log("filePath", filePath);

      try {
        const cloudinaryResponse = await cloudinaryUpload(filePath, {
          folder: "hashmi-pharmacy/product_image",
        });
        productImageUrl = cloudinaryResponse.secure_url;
        // console.log(`Image uploaded successfully: ${productImage}`);
      } catch (error: any) {
        ErrorHandler.send(res, 500, `${error}`);
        return;
      }
    }

    const product = await Product.create({
      productName,
      productDescription,
      category,
      quantity,
      inStock,
      price,
      productImage: productImageUrl,
    });
    if (!product) {
      ErrorHandler.send(res, 400, "Product creation failed");
    }

    nodecache.del("products");

    ResponseHandler.send(res, 201, "Product created successfully", product);
  } catch (error: unknown) {
    if (error instanceof Error) {
      ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
    } else {
      ErrorHandler.send(res, 500, `Something went wrong: ${error}`);
    }
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const cahceKey = "products";
    let data = nodecache.get(cahceKey);
    if (data) {
      ResponseHandler.send(res, 200, "Cached products", { products: data });
    } else {
      const products = await Product.find();
      nodecache.set("products", products);
      ResponseHandler.send(res, 200, "Products fetched successfully", {
        length: products.length,
        products,
      });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
    } else {
      ErrorHandler.send(res, 500, `Something went wrong: ${error}`);
    }
  }
};

export const updateProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.params;
    const {
      productName,
      productDescription,
      category,
      quantity,
      inStock,
      price,
    } = req.body;

    if (!productId) {
      ErrorHandler.send(res, 404, "Product not found");
      return;
    }

    const product = await Product.findByIdAndUpdate(
      productId,
      {
        productName,
        productDescription,
        category,
        quantity,
        inStock,
        price,
      },
      { new: true }
    );

    ResponseHandler.send(res, 201, "Product updated successfully", { product });

    nodecache.del("products");
  } catch (error: unknown) {
    if (error instanceof Error) {
      ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
    } else {
      ErrorHandler.send(res, 500, `Something went wrong: ${error}`);
    }
  }
};

export const deleteProduct = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productId } = req.body;
    if (!productId) {
      ErrorHandler.send(res, 404, "Product not found");
      return;
    }

    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      ErrorHandler.send(res, 400, "Error while deleting product");
      return;
    }

    nodecache.del("products");

    ResponseHandler.send(res, 200, "Products", { product });
  } catch (error: unknown) {
    if (error instanceof Error) {
      ErrorHandler.send(res, 500, `Internal Server Error: ${error.message}`);
    } else {
      ErrorHandler.send(res, 500, `Something went wrong: ${error}`);
    }
  }
};
