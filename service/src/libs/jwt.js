import jwt from "jsonwebtoken";
import 'dotenv/config';

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            },
            (error, token) => {
                if(error) reject(error)
                    resolve(token)
            }
        );
    });
}