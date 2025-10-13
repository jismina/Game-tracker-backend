// backend/controllers/resenaController.js
import Resena from "../models/resena.js";

// Obtener todas las reseñas
export const obtenerResenas = async (req, res) => {
  try {
    const resenas = await Resena.find().populate("juegoId");
    return res.json(resenas);
  } catch (error) {
    console.error("Error obtenerResenas:", error);
    return res.status(500).json({ mensaje: "Error al obtener las reseñas" });
  }
};

// Crear una reseña
export const crearResena = async (req, res) => {
  try {
    const { juegoId, texto, puntuacion } = req.body;
    if (!juegoId || !texto || puntuacion === undefined) {
      return res.status(400).json({ mensaje: "Campos obligatorios: juegoId, texto, puntuacion" });
    }

    const nueva = new Resena(req.body);
    await nueva.save();
    return res.status(201).json(nueva);
  } catch (error) {
    console.error("Error crearResena:", error);
    return res.status(400).json({ mensaje: "Error al crear la reseña" });
  }
};

// Actualizar una reseña
export const actualizarResena = async (req, res) => {
  try {
    const id = req.params.id;
    const actualizada = await Resena.findByIdAndUpdate(id, req.body, { new: true });
    if (!actualizada) return res.status(404).json({ mensaje: "Reseña no encontrada" });
    return res.json(actualizada);
  } catch (error) {
    console.error("Error actualizarResena:", error);
    return res.status(400).json({ mensaje: "Error al actualizar la reseña" });
  }
};

// Eliminar una reseña
export const eliminarResena = async (req, res) => {
  try {
    const id = req.params.id;
    const eliminada = await Resena.findByIdAndDelete(id);
    if (!eliminada) return res.status(404).json({ mensaje: "Reseña no encontrada" });
    return res.json({ mensaje: "Reseña eliminada correctamente" });
  } catch (error) {
    console.error("Error eliminarResena:", error);
    return res.status(400).json({ mensaje: "Error al eliminar la reseña" });
  }
};
