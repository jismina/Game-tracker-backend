import Resena from "../models/resena.js";
import mongoose from "mongoose";

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
    console.log("Datos recibidos:", req.body);
    if (!juegoId || !texto || puntuacion === undefined) {
      return res.status(400).json({ mensaje: "Campos obligatorios: juegoId, texto, puntuacion" });
    }

    // Asegurar que puntuacion sea número válido entre 1 y 5
    const puntuacionNum = Number(puntuacion);
    if (Number.isNaN(puntuacionNum) || puntuacionNum < 1 || puntuacionNum > 5) {
      return res.status(400).json({ mensaje: "puntuacion debe ser un número entre 1 y 5" });
    }

    const nueva = new Resena({ juegoId, texto, puntuacion: puntuacionNum });
    await nueva.save();
    return res.status(201).json(nueva);
  } catch (error) {
    console.error("Error crearResena:", error);
    // En desarrollo devolvemos el mensaje de error para facilitar debug
    return res.status(500).json({ mensaje: "Error al crear la reseña", error: error.message });
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

// Obtener estadísticas de reseñas
export const obtenerEstadisticas = async (req, res) => {
  try {
    const totalResenas = await Resena.countDocuments();
    const promedioCalificacion = await Resena.aggregate([
      {
        $group: {
          _id: null,
          promedio: { $avg: "$puntuacion" }
        }
      }
    ]);

    return res.json({
      totalResenas,
      promedioCalificacion: promedioCalificacion[0]?.promedio || 0
    });
  } catch (error) {
    console.error("Error obtenerEstadisticas:", error);
    return res.status(500).json({ mensaje: "Error al obtener las estadísticas" });
  }
};
