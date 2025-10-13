import Juego from "../models/juego.js";

export const obtenerJuegos = async (req, res) => {
  try {
    const juegos = await Juego.find();
    res.json(juegos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los juegos", error });
  }
};

export const crearJuego = async (req, res) => {
  try {
    const nuevoJuego = new Juego(req.body);
    await nuevoJuego.save();
    res.status(201).json(nuevoJuego);
  } catch (error) {
    res.status(400).json({ mensaje: "Error al crear el juego", error });
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
    res.status(400).json({ mensaje: "Error al actualizar el juego", error });
  }
};

export const eliminarJuego = async (req, res) => {
  try {
    const juegoEliminado = await Juego.findByIdAndDelete(req.params.id);

    if (!juegoEliminado) {
      return res.status(404).json({ mensaje: "Juego no encontrado" });
    }

    res.json({ mensaje: "Juego eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ mensaje: "Error al eliminar el juego", error });
  }
};

