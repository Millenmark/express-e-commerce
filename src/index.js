import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

/** IMPORT: CUSTOM MODULE */
import connectDB from "./config/connectDB.js";

/** IMPORT: CUSTOM MIDDLEWARE */
import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

/** IMPORT: ROUTE */
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";

/** APP CONFIG */
dotenv.config();
connectDB();
const app = express();
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
app.use(cors());

/** ROUTES */
// app.get("/", (req, res) => res.send(req.cookies)); // if the cookie not signed
app.get("/", (req, res) => res.send(req.signedCookies));
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

/** POST MIDDLEWARE */
app.use(notFound);
app.use(errorHandler);

/** START APP */
const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Server is already listening on port: ${port}`)
);
