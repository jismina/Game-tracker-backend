import mongoose from "mongoose";

const juegoSchema = new mongoose.Schema({
  titulo: { type: String, required: true, trim: true },
  genero: { type: String, required: true, trim: true },
  plataforma: { type: String, required: true, trim: true },
  añoLanzamiento: { 
    type: Number,
    min: 1950,
    max: new Date().getFullYear() + 5
  },
  desarrollador: { type: String, trim: true },
  descripcion: { type: String, trim: true },
  horasJugadas: { type: Number, default: 0, min: 0 },
  completado: { type: Boolean, default: false },
  imagenPortada: { type: String, default: "", trim: true }
}, {
  timestamps: true, // agrega automáticamente createdAt y updatedAt
  versionKey: false // elimina el campo __v
});

const Juego = mongoose.model("Juego", juegoSchema);

export default Juego;
