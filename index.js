import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import juegoRoutes from "./routes/juegoRoutes.js";
import resenaRoutes from "./routes/resenaRoutes.js";

dotenv.config();

const app = express();

// ✅ Configuración de CORS (importante para conectar con el frontend)
app.use(cors({
  origin: "http://localhost:5173", // permite peticiones desde tu frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando correctamente.");
});

// Rutas principales
app.use("/api/juegos", juegoRoutes);
app.use("/api/resenas", resenaRoutes);

// Conexión a la base de datos MongoDB
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/game-tracker")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((error) => console.error("❌ Error al conectar con MongoDB:", error));

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
