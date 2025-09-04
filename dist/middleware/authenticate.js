"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticates = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticates = (req, res, next) => {
    const token = req.cookies.token; // cookie name from login
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, 'AJIT');
        console.log("decoded", decoded);
        req.userId = decoded.id; // ✅ use _id from token and set userId
        console.log(req.userId = decoded.id);
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
};
exports.authenticates = authenticates;
