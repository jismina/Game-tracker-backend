import express from "express";
import { 
    obtenerResenas, crearResena, actualizarResena, eliminarResena, obtenerEstadisticas
} from "../controllers/resenaController.js";

const router = express.Router();

router.get("/", obtenerResenas);
router.post("/", crearResena);
router.put("/:id", actualizarResena);
router.delete("/:id", eliminarResena);
router.get("/estadisticas", obtenerEstadisticas);

export default router;

