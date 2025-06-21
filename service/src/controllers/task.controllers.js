import { 
    insertNewTask, 
    selectTheTask, 
    selectTheTaskHome,
    selectOneTaskById,
    deleteTaskId,
    updateTaskId
} from "../services/task.services.js";

export const createTask = async (req, res) => {
    const { title, description, image, date } = req.body;
    
    try {
        const newTask = {
            title,
            description,
            image, 
            date,
            user: req.user.id
        };

        const saveTask = await insertNewTask(newTask);
        return res.json(saveTask);
    } catch (error) {
        return res.status(500).json({ message: "Error al crear un task" });
    }
};

export const getTask = async (req, res) => {
    try {
        const tasks = await selectTheTask(req.user.id );
        return res.json(tasks);
    } catch (error) {
        return res.status(402).json({ message: "Error al obtener las tareas" });
    }
};

export const getTaskHome = async (req, res) => {
    try {
        const tasks = await selectTheTaskHome();
        return res.json(tasks);  
    } catch (error) {
        console.error('Error en la solicitud:', error);
        if (!res.headersSent) {
            return res.status(500).json({ message: "Error al obtener las tareas", error: error.message });
        }
    }
};


export const getOneTask = async (req, res) => {
    try {
        const task = await selectOneTaskById(req.params.id);
        return res.json(task);
    } catch (error) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
};

export const deleteTask = async (req, res) => {
    try {
        await deleteTaskId(req.params.id);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Task no encontrado" });
    }
};

export const updateTask = async (req, res) => {
    try {
        const task = await updateTaskId(req.params.id, req.body);
        return res.json(task);
    } catch (error) {
        return res.status(404).json({ message: "Task no encontrado" });
    }
};
