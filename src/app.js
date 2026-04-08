import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import mocksRouter from "./routes/mocks.router.js";
import adoptionRouter from "./routes/adoption.router.js"; // IMPORTANTE

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación API de Adopción',
            description: 'API para la gestión de usuarios y mascotas'
        }
    },
    apis: ['./src/docs/**/*.yaml'] 
};
const specs = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));


const connectionString = process.env.MONGODB_URL;
mongoose.connect(connectionString)
  .then(() => console.log("✅ Conexión exitosa a MongoDB Atlas"))
  .catch(err => console.error("❌ Error de conexión:", err.message));

app.use("/api/mocks", mocksRouter);
app.use("/api/adoptions", adoptionRouter); // RUTA PARA LOS TESTS

app.use((req, res) => {
  res.status(404).json({ status: "error", error: "La ruta solicitada no existe" });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
  console.log(`📖 Docs en http://localhost:${PORT}/api/docs`);
});