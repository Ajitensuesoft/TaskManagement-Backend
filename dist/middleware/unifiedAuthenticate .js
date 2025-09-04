"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unifiedAuthenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const unifiedAuthenticate = (req, res, next) => {
    console.log('Cookies:', req.cookies);
    console.log('Auth from Clerk:', req.auth);
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, 'AJIT');
            req.userId = decoded.id;
            console.log('Authenticated via JWT, userId:', req.userId);
            return next();
        }
        catch (err) {
            console.warn('JWT invalid or expired:', err);
        }
    }
    if (req.auth?.clerkUserId) {
        req.userId = req.auth.clerkUserId;
        console.log('Authenticated via Clerk, userId:', req.userId);
        return next();
    }
    return res.status(401).json({ message: 'Unauthorized: No valid token or user ID found' });
};
exports.unifiedAuthenticate = unifiedAuthenticate;
