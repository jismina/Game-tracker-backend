import Juego from "../models/juego.js";

export const obtenerJuegos = async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los juegos", error });
  }
};

export const obtenerJuegoPorId = async (req, res) => {
  try {
    const juego = await Juego.findById(req.params.id);
    if (!juego) return res.status(404).json({ message: "Juego no encontrado" });
    res.json(juego);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener juego" });
  }
};

export const crearJuego = async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    const guardado = await nuevoJuego.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(500).json({ message: "Error al crear juego" });
  }
};

export const actualizarJuego = async (req, res) => {
  try {
    const juegoActualizado = await Juego.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // runValidators aplica las validaciones del modelo
    );

    if (!juegoActualizado) {
      return res.status(404).json({ mensaje: "Juego no encontrado" });
    }

    res.json(juegoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar el juego", error });
  }
};

export const eliminarJuego = async (req, res) => {
  try {
    if (!req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ mensaje: "ID de juego inválido" });
    }

    const juegoEliminado = await Juego.findByIdAndDelete(req.params.id);

    if (!juegoEliminado) {
      return res.status(404).json({ mensaje: "Juego no encontrado" });
    }

    res.json({ 
      mensaje: "Juego eliminado correctamente",
      juego: juegoEliminado
    });
  } catch (error) {
    console.error('Error en eliminarJuego:', error);
    res.status(500).json({ 
      mensaje: "Error al eliminar el juego",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

