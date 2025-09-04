"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.endTime = exports.resetTime = exports.stopTime = exports.startTime = exports.getTimerByTodoId = void 0;
const Pomodoro_model_1 = require("../models/Pomodoro.model");
const todo_model_1 = __importDefault(require("../models/todo.model"));
// Helper
const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
};
// ✅ Get Timer by TodoId
const getTimerByTodoId = async (req, res) => {
    try {
        const { id } = req.params; // todoId
        const timer = await Pomodoro_model_1.Pomodoro.findOne({ todoId: id }).sort({ createdAt: -1 });
        if (!timer)
            return res.status(404).json({ message: "No timer found for this task" });
        return res.status(200).json({ message: "Timer fetched successfully", data: timer });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err });
    }
};
exports.getTimerByTodoId = getTimerByTodoId;
// ✅ Start Timer
const startTime = async (req, res) => {
    try {
        const id = req.params.id; // todoId
        const todo = await todo_model_1.default.findById(id);
        if (!todo)
            return res.status(404).json({ message: "Task not found" });
        let pomodoro = await Pomodoro_model_1.Pomodoro.findOne({ todoId: id });
        if (pomodoro) {
            if (pomodoro.isEnded) {
                return res.status(400).json({ message: "Timer already ended for this task" });
            }
            if (pomodoro.isRunning) {
                return res.status(200).json({ message: "Timer already running", data: pomodoro });
            }
            // Resume after stop
            pomodoro.startedAt = new Date();
            pomodoro.isRunning = true;
            await pomodoro.save();
        }
        else {
            // First time start
            pomodoro = new Pomodoro_model_1.Pomodoro({
                todoId: id,
                startedAt: new Date(),
                totalDuration: 0,
                isRunning: true,
                isEnded: false,
            });
            await pomodoro.save();
        }
        return res.status(200).json({ message: "Timer started", data: pomodoro });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err });
    }
};
exports.startTime = startTime;
// ✅ Stop Timer
const stopTime = async (req, res) => {
    try {
        const { id } = req.params; // timerId
        const timer = await Pomodoro_model_1.Pomodoro.findById(id);
        if (!timer)
            return res.status(404).json({ message: "Timer not found" });
        if (timer.isEnded) {
            return res.status(400).json({ message: "Timer already ended" });
        }
        if (timer.isRunning && timer.startedAt) {
            const now = new Date();
            const elapsed = Math.floor((now.getTime() - timer.startedAt.getTime()) / 1000);
            timer.totalDuration += elapsed;
            timer.isRunning = false;
            timer.stoppedAt = now;
            await timer.save();
        }
        return res.status(200).json({ message: "Timer stopped", data: timer });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err });
    }
};
exports.stopTime = stopTime;
// ✅ Reset Timer
const resetTime = async (req, res) => {
    try {
        const { id } = req.params; // timerId
        const timer = await Pomodoro_model_1.Pomodoro.findById(id);
        if (!timer)
            return res.status(404).json({ message: "Timer not found" });
        if (timer.isEnded) {
            return res.status(400).json({ message: "Cannot reset, timer already ended" });
        }
        timer.totalDuration = 0;
        timer.startedAt = null;
        timer.stoppedAt = null;
        timer.isRunning = false;
        await timer.save();
        return res.status(200).json({ message: "Timer reset", data: timer });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err });
    }
};
exports.resetTime = resetTime;
// ✅ End Timer
const endTime = async (req, res) => {
    try {
        const { id } = req.params; // timerId
        const timer = await Pomodoro_model_1.Pomodoro.findById(id);
        if (!timer)
            return res.status(404).json({ message: "Timer not found" });
        if (timer.isEnded) {
            return res.status(400).json({ message: "Timer already ended", data: timer });
        }
        if (timer.isRunning && timer.startedAt) {
            const now = new Date();
            const elapsed = Math.floor((now.getTime() - timer.startedAt.getTime()) / 1000);
            timer.totalDuration += elapsed;
        }
        timer.isRunning = false;
        timer.stoppedAt = new Date();
        timer.isEnded = true;
        await timer.save();
        return res.status(200).json({
            message: "Timer ended",
            totalTimeSeconds: timer.totalDuration,
            formattedTime: formatTime(timer.totalDuration),
        });
    }
    catch (err) {
        return res.status(500).json({ message: "Internal server error", error: err });
    }
};
exports.endTime = endTime;
