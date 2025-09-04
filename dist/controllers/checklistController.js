"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteChecklistItem = exports.updateChecklistItem = exports.createChecklistItem = exports.getChecklistItems = exports.getTodoById = void 0;
const checklist_model_1 = __importDefault(require("../models/checklist.model"));
const todo_model_1 = __importDefault(require("../models/todo.model"));
const verifyTodoOwnership = async (todoId, userId) => {
    const todo = await todo_model_1.default.findOne({ _id: todoId, userId });
    return !!todo;
};
// --- GET Single Todo by ID (New Functionality) ---
const getTodoById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const todo = await todo_model_1.default.findOne({ _id: id, userId });
        if (!todo) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }
        res.status(200).json(todo);
    }
    catch (err) {
        console.error("Error fetching single todo:", err);
        res.status(500).json({ message: "Failed to fetch todo" });
    }
};
exports.getTodoById = getTodoById;
// --- GET All Checklist Items for a Todo ---
const getChecklistItems = async (req, res) => {
    try {
        const { todoId } = req.params;
        const userId = req.userId;
        const isOwner = await verifyTodoOwnership(todoId, userId);
        if (!isOwner) {
            return res.status(403).json({ message: "Access denied: Todo not found or unauthorized" });
        }
        const checklistItems = await checklist_model_1.default.find({ todo: todoId }).sort({ createdAt: 1 });
        res.status(200).json(checklistItems);
    }
    catch (err) {
        console.error("Error fetching checklist items:", err);
        res.status(500).json({ message: "Failed to fetch checklist items" });
    }
};
exports.getChecklistItems = getChecklistItems;
// --- CREATE Checklist Item ---
const createChecklistItem = async (req, res) => {
    try {
        const { todoId } = req.params;
        const userId = req.userId;
        const { title, status } = req.body;
        if (!title) {
            return res.status(400).json({ message: "Checklist item title is required" });
        }
        const isOwner = await verifyTodoOwnership(todoId, userId);
        if (!isOwner) {
            return res.status(403).json({ message: "Access denied: Todo not found or unauthorized" });
        }
        const newChecklistItem = await checklist_model_1.default.create({
            todo: todoId,
            title,
            status: status || "Pending",
        });
        res.status(201).json(newChecklistItem);
    }
    catch (err) {
        console.error("Error creating checklist item:", err);
        res.status(500).json({ message: "Failed to create checklist item" });
    }
};
exports.createChecklistItem = createChecklistItem;
// --- UPDATE Checklist Item ---
const updateChecklistItem = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const { title, status } = req.body;
        const checklistItem = await checklist_model_1.default.findById(id);
        if (!checklistItem) {
            return res.status(404).json({ message: "Checklist item not found" });
        }
        const isOwner = await verifyTodoOwnership(checklistItem.todo.toString(), userId);
        if (!isOwner) {
            return res.status(403).json({ message: "Access denied: Unauthorized to update this checklist item" });
        }
        const updatedChecklistItem = await checklist_model_1.default.findByIdAndUpdate(id, { title, status }, { new: true });
        res.status(200).json(updatedChecklistItem);
    }
    catch (err) {
        console.error("Error updating checklist item:", err);
        res.status(500).json({ message: "Failed to update checklist item" });
    }
};
exports.updateChecklistItem = updateChecklistItem;
// --- DELETE Checklist Item ---
const deleteChecklistItem = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;
        const checklistItem = await checklist_model_1.default.findById(id);
        if (!checklistItem) {
            return res.status(404).json({ message: "Checklist item not found" });
        }
        const isOwner = await verifyTodoOwnership(checklistItem.todo.toString(), userId);
        if (!isOwner) {
            return res.status(403).json({ message: "Access denied: Unauthorized to delete this checklist item" });
        }
        await checklist_model_1.default.findByIdAndDelete(id);
        res.status(204).send();
    }
    catch (err) {
        console.error("Error deleting checklist item:", err);
        res.status(500).json({ message: "Failed to delete checklist item" });
    }
};
exports.deleteChecklistItem = deleteChecklistItem;
