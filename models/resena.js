import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({
  juegoId: { type: mongoose.Schema.Types.ObjectId, ref: "Juego", required: true },
  texto: { type: String, required: true },
  puntuacion: { type: Number, min: 1, max: 5, required: true },
  fecha: { type: Date, default: Date.now },
}, { timestamps: true });

const Resena = mongoose.model("Resena", resenaSchema);
export default Resena;

