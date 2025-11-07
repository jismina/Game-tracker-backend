import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Juego", required: true },
  puntuacion: { type: Number, min: 1, max: 5, required: true },
  textoReseña: { type: String, required: true },
  horasJugadas: { type: Number, default: 0 },
  dificultad: { type: String, enum: ["Fácil", "Media", "Difícil"], required: true },
  recomendaria: { type: Boolean, required: false},
  fechaCreacion: { type: Date, default: Date.now },
  fechaActualizacion: { type: Date, default: Date.now }
}, { timestamps: true });

const Resena = mongoose.model("Resena", resenaSchema);
export default Resena;

