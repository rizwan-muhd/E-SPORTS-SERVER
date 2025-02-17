import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken'

interface AuthRequest extends Request {
    user?: any
}

// middleware to verify JWT and attach user to request
export const authenticateUser = (req: AuthRequest, res: Response, next: NextFunction): any => {
    const token = req.headers.authorization?.split("")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized:No token provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
        req.user = decoded;
        next();
    } catch (error: any) {
        return res.status(403).json({ message: 'Invalid or Expired Token' })
    }
};

export const authorizeAdmin = (req: AuthRequest, res: Response, next: NextFunction): any => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ message: 'Forbidden: Admin access required' })
    }
    next();
}