import express from "express";
import dotenv from "dotenv";
import postRoute from "./routes/postRoute";
import contectDB from "./db/db";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.Client_URL,
    credentials: true,
  }),
);

dotenv.config();

const PORT = process.env.PORT || 8001;

app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);

app.listen(PORT, () => {
  contectDB();
  console.log("Server is running on PORT : ", PORT);
});
