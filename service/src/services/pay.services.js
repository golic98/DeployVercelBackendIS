import bcrypt from "bcrypt";
import Pay from '../models/pay.vigilance.model.js';
import { findPay, createPay, getAllPays } from "../repository/pay.repository.js";

export const processPay = async (payData, userId) => {
    const { numberTarget, context, amount, date, cvc } = payData;

    const targetFound = await findPay(numberTarget);

    if(targetFound) {
        throw new Error("Error: Consulte con el administrador");
    }
    
    const targetHash = await bcrypt.hash(numberTarget, 10);

    const newPay = new Pay({
        numberTarget: targetHash,
        context, 
        amount, 
        date, 
        cvc,
        user: userId
    });

    return await createPay(newPay);
};

export const selectPay = async () => {
    return await getAllPays();
};