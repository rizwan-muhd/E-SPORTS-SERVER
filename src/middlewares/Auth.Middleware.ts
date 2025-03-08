import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
    user?: any
}


// middleware to verify JWT and attach user to request
export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): any => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1]; // Correct way to extract token
    console.log(token)

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as any;
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error: any) {
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction): any => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admin access required' })
    }
    next();
}