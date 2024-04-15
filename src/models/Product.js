import { Schema, model, Types } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Product Name is required"],
      maxlength: 100,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: 1_000,
    },
    image: {
      type: String,
      default: "/uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: {
        values: ["office", "kitchen", "bedroom", "confortthing"],
        message: "{VALUE} is not supported in category field",
      },
    },
    company: {
      type: String,
      required: [true, "Company is required"],
      enum: {
        values: ["ikea", "motorola", "liddy", "kupssy"],
        message: "{VALUE} is not supported in company field",
      },
    },
    colors: {
      type: [String],
      default: ["#222"],
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isShippingFree: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Product", ProductSchema);
