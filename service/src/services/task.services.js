import { 
    insertTask, 
    selectTask, 
    selectTaskHome,
    selectOneTask,
    deleteTaskById,
    updateTaskById
} from "../repository/task.repository.js";

export const insertNewTask = async (taskData) => {
    try {
        const newTask = await insertTask(taskData);
        return newTask;
    } catch (error) {
        return new Error(error.message);
    }
};

export const selectTheTask = async (userId) => {
    try {
        return await selectTask(userId);
    } catch (error) {
        return new Error(error.message);
    }
};

export const selectTheTaskHome = async () => {
    try {
        return await selectTaskHome();
    } catch (error) {
        throw new Error(error.message);
    }
};

export const selectOneTaskById = async (taskId) => {
    try {
        const task = await selectOneTask(taskId);

        if(!task) {
            throw new Error("Tarea no encontrada");
        }
        
        return task;
    } catch (error) {
        return new Error(error.message);
    }
};

export const deleteTaskId = async (taskId) => {
    try {
        const task = await deleteTaskById(taskId);

        if (!task) {
            throw new Error("Tarea no encontrada");
        }
    
        return task;
    } catch (error) {
        return new Error(error.message);
    }
};

export const updateTaskId = async (taskId, taskData) => {
    try {
        const updateTask = await updateTaskById(taskId, taskData);

        if (!updateTask) {
            throw new Error("Tarea no encontrada");
        }
    
        return updateTask;
    } catch (error) {
        return new Error(error.message);
    }
};