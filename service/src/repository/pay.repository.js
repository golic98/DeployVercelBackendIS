import Pay from "../models/pay.vigilance.model.js";

export const findPay = async (numberTarjet) => {
    return await Pay.findOne({ numberTarjet });
};

export const createPay = async (payData) => {
    const newPay = new Pay(payData);
    return await newPay.save();
};

export const getAllPays = async () => {
    return await Pay.find();
};