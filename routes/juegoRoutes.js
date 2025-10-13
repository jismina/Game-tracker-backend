import express from "express";
import {
  obtenerJuegos,
  crearJuego,
  actualizarJuego,
  eliminarJuego,
} from "../controllers/juegoController.js";

const router = express.Router();

router.get("/", obtenerJuegos);
router.post("/", crearJuego);
router.put("/:id", actualizarJuego);
router.delete("/:id", eliminarJuego);

export default router;
