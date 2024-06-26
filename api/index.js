import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import brandRoute from "./routes/brandRoute.js";
import productRoute from "./routes/productRoute.js";
import tagRoute from "./routes/tagRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import authRoute from "./routes/authRoute.js";
import roleRoute from "./routes/roleRoute.js";
import permissionRoute from "./routes/permissionRoute.js";
import mongoDBConnect from "./config/db.js";
import { errorHandle } from "./middlewares/errorHandler.js";
import cookieParser from "cookie-parser";

// init express
const app = express();
dotenv.config();

/// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.DOMAIN.split(',')],
    credentials: true,
  })
);

// static
app.use(express.static("/api/public"));

// routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/product/brand", brandRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/product/tag", tagRoute);
app.use("/api/v1/product/category", categoryRoute);
app.use("/api/v1/role", roleRoute);
app.use("/api/v1/permission", permissionRoute);
app.use("/api/v1/auth", authRoute);

// server port
const PORT = process.env.PORT || 5056;

// error handler
app.use(errorHandle);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'))
  );
}


app.listen(PORT, () => {
  mongoDBConnect();
  console.log(`Server running on port ${PORT}`.bgGreen.black);
});
