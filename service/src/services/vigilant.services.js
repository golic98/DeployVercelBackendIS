import { createSchedule, selectSchedule } from "../repository/schedule.repository.js";

export const createNewSchedule = async (scheduleData) => {
    if(!scheduleData.name) {
        throw new Error("El nombre del horario es obligatorio");
    }

    const newSchedule = await createSchedule(scheduleData);
    return newSchedule;
};

export const getAllSchedulesService = async () => {
    const schedules = await selectSchedule();
    return schedules;
};