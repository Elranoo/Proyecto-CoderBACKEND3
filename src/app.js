import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import mocksRouter from "./routes/mocks.router.js";

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB Atlas
// La URL se toma del archivo .env (MONGODB_URL)
const connectionString = process.env.MONGODB_URL;

mongoose.connect(connectionString)
  .then(() => {
    console.log("✅ Conexión exitosa a MongoDB Atlas");
  })
  .catch(err => {
    console.error("❌ Error de conexión a la base de datos:");
    console.error(err.message);
  });

// Ruta base según la consigna
app.use("/api/mocks", mocksRouter);

// Manejador de rutas no encontradas (Corregido para evitar el error de PathError)
app.use((req, res) => {
  res.status(404).json({ 
    status: "error", 
    error: "La ruta solicitada no existe" 
  });
});

// Inicio del servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📡 Ruta base activa en http://localhost:${PORT}/api/mocks`);
});