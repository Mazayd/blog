import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import { UserRouter } from "./src/user/user.router.mjs";

const app = express();
const port = process.env.PORT;

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URL, { useNewUrlParser: true })
  .then(() => console.log("mongoose ready"));

app.use(express.json());
app.use(morgan("common"));
app.use("/user", UserRouter);

app.listen(port, () => {
  console.log("Server listen port " + port);
});
