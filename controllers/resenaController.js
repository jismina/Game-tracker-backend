import Resena from "../models/resena.js";
import Juego from "../models/juego.js";
import mongoose from "mongoose";

// Obtener todas las reseñas con paginación y filtros
export const obtenerResenas = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      sort = '-createdAt',
      juegoId,
      puntuacionMin,
      puntuacionMax
    } = req.query;

    const filtro = {};
    if (juegoId) filtro.juegoId = juegoId;
    if (puntuacionMin || puntuacionMax) {
      filtro.puntuacion = {};
      if (puntuacionMin) filtro.puntuacion.$gte = Number(puntuacionMin);
      if (puntuacionMax) filtro.puntuacion.$lte = Number(puntuacionMax);
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: sort,
      populate: {
        path: 'juegoId',
        select: 'titulo genero plataforma'
      }
    };

    const resenas = await Resena.find(filtro)
      .populate(options.populate)
      .sort(options.sort)
      .skip((options.page - 1) * options.limit)
      .limit(options.limit);

    const total = await Resena.countDocuments(filtro);

    return res.json({
      resenas,
      totalPaginas: Math.ceil(total / options.limit),
      paginaActual: options.page,
      totalResenas: total
    });
  } catch (error) {
    console.error("Error en obtenerResenas:", error);
    return res.status(500).json({ 
      mensaje: "Error al obtener las reseñas",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Obtener reseñas por juego
export const obtenerResenasPorJuego = async (req, res) => {
  try {
    const { juegoId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(juegoId)) {
      return res.status(400).json({ mensaje: "ID de juego inválido" });
    }

    const juego = await Juego.findById(juegoId);
    if (!juego) {
      return res.status(404).json({ mensaje: "Juego no encontrado" });
    }

    const resenas = await Resena.find({ juegoId })
      .sort('-createdAt')
      .populate('juegoId', 'titulo');

    res.json({
      juego: {
        titulo: juego.titulo,
        id: juego._id
      },
      resenas
    });
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

    if (!mongoose.Types.ObjectId.isValid(juegoId)) {
      return res.status(400).json({ mensaje: "juegoId inválido" });
    }

    const puntuacionNum = Number(puntuacion);
    if (Number.isNaN(puntuacionNum) || puntuacionNum < 1 || puntuacionNum > 5) {
      return res.status(400).json({ mensaje: "puntuacion debe ser un número entre 1 y 5" });
    }

    const nueva = new Resena({ juegoId, texto, puntuacion: puntuacionNum });
    await nueva.save();
    return res.status(201).json(nueva);
  } catch (error) {
    console.error("Error crearResena:", error);
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

// ✅ Obtener estadísticas completas (para tu vista Estadísticas.jsx)
export const obtenerEstadisticas = async (req, res) => {
  try {
    // Log simple para depuración cuando el endpoint es llamado
    console.log('GET /api/resenas/estadisticas - solicitada');
    // Obtener reseñas y juegos
    const resenas = await Resena.find();
    const juegos = await Juego.find();

    // Cálculo de estadísticas
    const totalJuegos = juegos.length;
    const totalResenas = resenas.length;

    // Promedio de calificación
    const promedioCalificacion =
      totalResenas > 0
        ? resenas.reduce((acc, r) => acc + (r.puntuacion || 0), 0) / totalResenas
        : 0;

    // Horas totales
    const horasTotales = juegos.reduce((acc, j) => acc + (j.horasJugadas || 0), 0);

    // Juegos completados
    const juegosCompletados = juegos.filter(j => j.completado).length;

    // Plataformas más jugadas
    const plataformas = {};
    juegos.forEach(j => {
      if (j.plataforma) {
        plataformas[j.plataforma] = (plataformas[j.plataforma] || 0) + 1;
      }
    });

    const plataformasMasJugadas = Object.entries(plataformas)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([plat]) => plat);

    // Enviar al frontend
    return res.json({
      totalJuegos,
      totalResenas,
      juegosCompletados,
      horasTotales,
      promedioCalificacion,
      plataformasMasJugadas,
    });
  } catch (error) {
    console.error("Error obtenerEstadisticas:", error);
    return res.status(500).json({ 
      mensaje: "Error al obtener las estadísticas",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
