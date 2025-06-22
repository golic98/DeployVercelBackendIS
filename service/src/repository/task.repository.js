import Task from "../models/task.model.js";

export const insertTask = async (taskData) => {
    const newTask = new Task(taskData);
    return await newTask.save();
};

export const selectTask = async (userId) => {
    return await Task.findById({ user: userId }).populate();
};

export const selectTaskHome = async () => {
    try {
        const tasks = await Task.find();
        return tasks;
    } catch (error) {
        throw new Error('Error al obtener las tareas desde la base de datos');
    }
};

export const selectOneTask = async (taskId) => {
    return await Task.findById(taskId).populate("user");
};

export const deleteTaskById = async (taskId) => {
    return await Task.findByIdAndDelete(taskId);
};

export const updateTaskById = async (taskId, taskData) => {
    return await Task.findByIdAndUpdate(taskId, taskData, { new: true });
};