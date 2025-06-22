import { processPay, selectPay } from "../services/pay.services.js";

export const addPayVigilance = async (req, res) => {
    try {
        const { numberTarget, context, amount, date, cvc } = req.body;

        const payData = { numberTarget, context, amount, date, cvc };
        const userId = req.user.id;

        const savePay = await processPay(payData, userId);
        res.json(savePay);
    } catch (error) {
        console.log("Error al guardar un pago", error);
    }
};

export const getAllPay = async (req, res) => {
    try {
        const pay = await selectPay();
        res.json(pay);
    } catch (error) {
        console.log(error);
    }
};