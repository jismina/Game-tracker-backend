import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import juegoRoutes from "./routes/juegoRoutes.js";
import resenaRoutes from "./routes/resenaRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor backend funcionando correctamente.");
});

app.use("/api/juegos", juegoRoutes);
app.use("/api/resenas", resenaRoutes);

mongoose
  .connect(process.env.MONGO_URI || "mongodb+srv://jacobogarcesoquendo:aFJzVMGN3o7fA38A@cluster0.mqwbn.mongodb.net/MilenaAnahiAlacheEcheverria")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((error) => console.error("❌ Error al conectar con MongoDB:", error));

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
