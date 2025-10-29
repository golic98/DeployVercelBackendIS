import "dotenv/config";
import jwt from "jsonwebtoken";

const TOKEN_SECRET = process.env.TOKEN_PRIVATE;

export function createAccessToken(payload) {
    return new Promise((resolve, reject) => {
        jwt.sign(
            payload,
            TOKEN_SECRET,
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