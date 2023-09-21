import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import ConnectDB from "./config/db.js";
import productRoute from "./routes/productRoute.js";
import userRoute from "./routes/userRoutes.js";
import { errorListening } from "./middlewares/error.js";

const app = express();

dotenv.config();

//database connection
ConnectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//handle uncaughtException
process.on("uncaughtException", (err) => {
  console.log(`Error:${err.message}`.red);
  console.log(`Shutting down the server to handle unCaughtException`);
  process.exit(1);
});

//routing
app.use("/api/v1", productRoute);
app.use("/api/v1", userRoute);

app.get("/", (req, res) => {
  res.send("<h1>Server is working</h1>");
});

app.use("/gallery", express.static("public/gallery"));

//custom error handling
app.use(errorListening);

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(
    `Server is running at port: http://localhost:${PORT},in ${process.env.NODE_ENV} MODE`
      .cyan.underline.bold
  );
});

//handled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error:${err.message}`.red);
  console.log(`Shutting down the server to handle promise rejection!`);
  server.close(() => {
    process.exit(1);
  });
});
