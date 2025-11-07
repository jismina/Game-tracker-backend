import mongoose from "mongoose";

const juegoSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  titulo: { type: String, required: true },
  genero: { type: String, required: true },
  plataforma: { type: String, required: true },
  añoLanzamiento: { type: Number },
  desarrollador: { type: String },
  descripcion: { type: String },
  horasJugadas: { type: Number, default: 0 },
  completado: { type: Boolean, default: false },
  fechaCompletado: { type: Date },
  puntuacion: { type: Number, min: 0, max: 5 },
  imagenPortada: { type: String, default: "" }

}, {
  timestamps: true // agrega automáticamente createdAt y updatedAt
});

const Juego = mongoose.model("Juego", juegoSchema);

export default Juego;
