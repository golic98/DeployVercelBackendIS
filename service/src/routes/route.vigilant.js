import { Router } from "express";
import { authRequired } from "../middlewares/validate.token.js";
import { createSchedule, createVisit, getAllSchedules, getAllVisits } from "../controllers/vigilant.controllers.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Vigilancia
 *   description: Endpoints para horarios y visitas
 */

/**
 * @swagger
 * /api/v1/schedules:
 *   post:
 *     summary: Crear un nuevo horario de vigilancia
 *     tags: [Vigilancia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSchedule'
 *     responses:
 *       201:
 *         description: Horario creado correctamente
 */

/**
 * @swagger
 * /api/v1/visit:
 *   post:
 *     summary: Registrar una nueva visita
 *     tags: [Vigilancia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateVisit'
 *     responses:
 *       201:
 *         description: Visita registrada correctamente
 */

/**
 * @swagger
 * /api/v1/schedules:
 *   get:
 *     summary: Obtener todos los horarios
 *     tags: [Vigilancia]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de horarios
 */

/**
 * @swagger
 * /api/v1/visits:
 *   get:
 *     summary: Obtener todas las visitas
 *     tags: [Vigilancia]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de visitas
 */



router.post("/schedules", authRequired, createSchedule);
router.post("/visit", authRequired, createVisit);
router.get("/schedules", authRequired, getAllSchedules);
router.get("/visits", authRequired, getAllVisits);

export default router;