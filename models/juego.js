import mongoose from "mongoose";

const juegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  plataforma: { type: String, required: true },
  horasJugadas: { type: Number, default: 0 },
  completado: { type: Boolean, default: false },
  puntuacion: { type: Number, min: 0, max: 5 },
  imagen: { type: String },
}, {
  timestamps: true // agrega automáticamente createdAt y updatedAt
});

const Juego = mongoose.model("Juego", juegoSchema);

export default Juego;
