import mongoose from "mongoose";

const resenaSchema = new mongoose.Schema({
  juegoId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Juego", 
    required: [true, "El ID del juego es requerido"]
  },
  puntuacion: { 
    type: Number, 
    min: [1, "La puntuación mínima es 1"], 
    max: [5, "La puntuación máxima es 5"], 
    required: [true, "La puntuación es requerida"]
  },
  textoReseña: { 
    type: String, 
    required: [true, "El texto de la reseña es requerido"],
    trim: true,
    minlength: [10, "La reseña debe tener al menos 10 caracteres"]
  },
  horasJugadas: { 
    type: Number, 
    default: 0,
    min: [0, "Las horas jugadas no pueden ser negativas"]
  },
  dificultad: { 
    type: String, 
    enum: {
      values: ["Fácil", "Media", "Difícil"],
      message: "La dificultad debe ser Fácil, Media o Difícil"
    },
    required: [true, "La dificultad es requerida"]
  },
  recomendaria: { 
    type: Boolean,
    default: null
  }
}, { 
  timestamps: true,
  versionKey: false
});

const Resena = mongoose.model("Resena", resenaSchema);
export default Resena;

