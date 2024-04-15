import Product from "../models/Product.js";
import { Types } from "mongoose";
import { uploadImage } from "../utils/uploadingFile.js";

/**
 *-----------------
 * * CONTROLLERS ⬇️
 *-----------------
 */
export const createProduct = async (req, res) => {
  const {
    body: {
      name,
      price,
      description,
      category,
      company,
      colors,
      quantity,
      isFeatured,
      isShippingFree,
      averageRating,
    },
    user: { _id: userId },
  } = req;

  const product = await Product.create({
    name,
    price,
    description,
    category,
    company,
    colors,
    quantity,
    isFeatured,
    isShippingFree,
    averageRating,
    createdBy: userId,
  });

  console.log(product);

  res.status(201).json({ message: "Product created successfully" });
};

export const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ products, count: products.length });
};

export const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;

  if (!Types.ObjectId.isValid(productId))
    return res.status(404).json({ message: "Not Found" });

  const product = await Product.findById(productId);

  if (!product) return res.status(404).json({ message: "Not Found" });

  res.status(200).json({ product });
};

export const updateProduct = async (req, res) => {
  const { id: productId } = req.params;

  if (!Types.ObjectId.isValid(productId))
    return res.status(404).json({ message: "Not Found" });

  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) return res.status(404).json({ message: "Not Found" });

  if (req.files && req.files.image) {
    const { image } = req.files;
    product.image = await uploadImage(image, `tutorial/products/${productId}`);
    product.save();
  }

  console.log(product);

  res.status(200).json({ message: "Product updated successfully" });
};

export const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;

  if (!Types.ObjectId.isValid(productId))
    return res.status(404).json({ message: "Not Found" });

  const product = await Product.findByIdAndDelete(productId);

  if (!product) return res.status(404).json({ message: "Not Found" });

  res.status(200).json({ message: "Product deleted successfully" });
};
