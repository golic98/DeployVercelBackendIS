import { Router } from "express";
import { authRequired } from "../middlewares/validate.token.js";
import { getTask, getOneTask, createTask, updateTask, deleteTask, getTaskHome } from "../controllers/task.controllers.js";
import { getTask2, getOneTask2, createTask2, updateTask2, deleteTask2, getTaskHome2 } from "../controllers/task2.controllers.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { createTaskSchema, createTaskSchema2 } from "../schema/task.schema.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Endpoints para la gestión de tareas
 */

/**
 * @swagger
 * /api/v1/task:
 *   post:
 *     summary: Crear una nueva tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 */

/**
 * @swagger
 * /api/v1/task:
 *   get:
 *     summary: Obtener todas las tareas
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 */

/**
 * @swagger
 * /api/v1/taskhome:
 *   get:
 *     summary: Obtener tareas para home
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas home
 */

/**
 * @swagger
 * /api/v1/task/{id}:
 *   get:
 *     summary: Obtener una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos de la tarea
 */

/**
 * @swagger
 * /api/v1/task/{id}:
 *   put:
 *     summary: Actualizar una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTask'
 *     responses:
 *       200:
 *         description: Tarea actualizada
 */

/**
 * @swagger
 * /api/v1/task/{id}:
 *   delete:
 *     summary: Eliminar una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea eliminada
 */

/**
 * @swagger
 * /api/v1/taskd:
 *   post:
 *     summary: Crear una nueva tarea D
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskD'
 *     responses:
 *       201:
 *         description: Tarea D creada correctamente
 */

/**
 * @swagger
 * /api/v1/taskd:
 *   get:
 *     summary: Obtener todas las tareas D
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas D
 */

/**
 * @swagger
 * /api/v1/taskhomed:
 *   get:
 *     summary: Obtener tareas D para home
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas D home
 */

/**
 * @swagger
 * /api/v1/taskd/{id}:
 *   get:
 *     summary: Obtener una tarea D por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Datos de la tarea D
 */

/**
 * @swagger
 * /api/v1/taskd/{id}:
 *   put:
 *     summary: Actualizar una tarea D por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateTaskD'
 *     responses:
 *       200:
 *         description: Tarea D actualizada
 */

/**
 * @swagger
 * /api/v1/taskd/{id}:
 *   delete:
 *     summary: Eliminar una tarea D por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tarea D eliminada
 */


router.post("/task", authRequired, validateSchema(createTaskSchema), createTask);
router.get("/task", authRequired, getTask);
router.get("/taskhome", authRequired, getTaskHome);
router.get("/task/:id", authRequired, getOneTask);
router.delete("/task/:id", authRequired, deleteTask);
router.put("/task/:id", authRequired, updateTask);

router.post("/taskd", authRequired, validateSchema(createTaskSchema2), createTask2);
router.get("/taskd", authRequired, getTask2);
router.get("/taskhomed", authRequired, getTaskHome2);
router.get("/taskd/:id", authRequired, getOneTask2);
router.delete("/taskd/:id", authRequired, deleteTask2);
router.put("/taskd/:id", authRequired, updateTask2);

export default router;