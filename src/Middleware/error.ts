import { Request, Response, NextFunction } from "express"
import { ApiError } from "../Helpers/api-erros"

export function errorMiddleware (error: Error & Partial<ApiError>, req: Request, res: Response, next: NextFunction) {
    const statusCode = error.statusCode ?? 500
    const message = error.statusCode ?? error.message 

    return res.status(statusCode).json({ message })
}