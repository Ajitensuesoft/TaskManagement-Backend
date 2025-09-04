"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.signin = exports.signup = void 0;
const usermodel_1 = __importDefault(require("../models/usermodel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET_KEY = 'AJIT';
const signup = async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    console.log("signup data", email, password, confirmPassword);
    if (!email || !password || !confirmPassword) {
        return res.status(400).json({ message: "All fields are required" });
    }
    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match" });
    }
    try {
        const hashpassword = await bcrypt_1.default.hash(password, 10);
        const newUser = new usermodel_1.default({
            email,
            password_hash: hashpassword,
            role: 'local',
        });
        let data = await newUser.save();
        console.log("data", data);
        return res.status(201).json({
            message: "User created successfully",
        });
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                message: "This email is already registered."
            });
        }
        console.error("Signup error:", err);
        return res.status(500).json({
            message: "Something went wrong during signup."
        });
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    const { email, password } = req.body;
    console.log("emailpassowrd", email, password);
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const userexist = await usermodel_1.default.findOne({ email });
        if (!userexist) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }
        if (userexist.role !== 'local') {
            return res.status(400).json({
                message: "This email is registered via a different method. Please use the appropriate login."
            });
        }
        if (!userexist.password_hash) {
            return res.status(500).json({ message: "User data is inconsistent." });
        }
        const isMatch = await bcrypt_1.default.compare(password, userexist.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const payload = {
            id: userexist._id,
            email: userexist.email,
        };
        const token = jsonwebtoken_1.default.sign(payload, JWT_SECRET_KEY, { expiresIn: '1h' });
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        };
        console.log("token", token);
        res.cookie('token', token, options).json({
            message: "Signin successful",
            id: userexist._id,
            email: email,
            token: token,
            options: options
        });
        // res.status(200).json({token:token});
    }
    catch (err) {
        console.error("Signin error:", err);
        return res.status(500).json({ message: 'Something went wrong during signin.' });
    }
};
exports.signin = signin;
const logout = async (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successful' });
};
exports.logout = logout;
