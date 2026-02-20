import express from "express";
import mongoose from "mongoose";
import mocksRouter from "./routes/mocks.router.js";

const app = express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mockingDB")
  .then(() => console.log("Base de datos conectada"))
  .catch(err => console.log(err));

app.use("/api/mocks", mocksRouter);

app.listen(8080, () => {
  console.log("Servidor corriendo en puerto 8080");
});