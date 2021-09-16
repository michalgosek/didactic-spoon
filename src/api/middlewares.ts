import { NextFunction, Request, Response } from "express";

function CorsMiddleware(req: Request, res: Response, next: NextFunction) {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
}

function NotFoundMiddleware(req: Request, res: Response, next: NextFunction) {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
}

export default {
    CorsMiddleware,
    NotFoundMiddleware
}