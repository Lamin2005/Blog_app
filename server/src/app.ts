import express from "express";
import dotenv from "dotenv";
import postRoute from "./routes/postRoute";
import contectDB from "./db/db";

const app = express();

app.use(express.json());

dotenv.config();

const PORT = process.env.PORT || 8001;

app.use("/api/posts",postRoute);

app.listen(PORT, () => {
  contectDB();
  console.log("Server is running on PORT : ", PORT);
});
