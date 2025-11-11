import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { JWT_PASSWORD } from "./config.js";

declare global {
    namespace Express {
        interface Request {
            userId?: string
        }
    }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];

    if (!header) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }
    try {
        const decoded = jwt.verify(header, JWT_PASSWORD) as { id: string }
        if (decoded) {
            req.userId = decoded.id;
        }
        next();
    } catch (err) {
        return res.status(401).json({ message: "Please login again" })
    }
}