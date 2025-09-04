import { Request, Response } from "express";
import Checklist from "../models/checklist.model"; 
import Todo from "../models/todo.model"; 

const verifyTodoOwnership = async (todoId: string, userId: string) => {
 const todo = await Todo.findOne({ _id: todoId, userId }); return !!todo; 
};

// --- GET Single Todo by ID (New Functionality) ---
export const getTodoById = async (req: any, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const todo = await Todo.findOne({ _id: id, userId });

        if (!todo) {
            return res.status(404).json({ message: "Todo not found or unauthorized" });
        }

        res.status(200).json(todo);
    } catch (err) {
        console.error("Error fetching single todo:", err);
        res.status(500).json({ message: "Failed to fetch todo" });
    }
};

// --- GET All Checklist Items for a Todo ---
export const getChecklistItems = async (req: any, res: Response) => {
 try {
 const { todoId } = req.params;
 const userId = req.userId; 

 const isOwner = await verifyTodoOwnership(todoId, userId);
 if (!isOwner) {
 return res.status(403).json({ message: "Access denied: Todo not found or unauthorized" });
 }

 const checklistItems = await Checklist.find({ todo: todoId }).sort({ createdAt: 1 });
 res.status(200).json(checklistItems);
} catch (err) {
 console.error("Error fetching checklist items:", err);
 res.status(500).json({ message: "Failed to fetch checklist items" });
 }
};

// --- CREATE Checklist Item ---
export const createChecklistItem = async (req: any, res: Response) => {
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

 const newChecklistItem = await Checklist.create({
 todo: todoId,
 title,
 status: status || "Pending", 
 });

 res.status(201).json(newChecklistItem);
} catch (err) {
 console.error("Error creating checklist item:", err);
 res.status(500).json({ message: "Failed to create checklist item" });
}
};

// --- UPDATE Checklist Item ---
export const updateChecklistItem = async (req: any, res: Response) => {
 try {
 const { id } = req.params; 
 const userId = req.userId; 
const { title, status } = req.body; 

 const checklistItem = await Checklist.findById(id);
 if (!checklistItem) {
return res.status(404).json({ message: "Checklist item not found" });
}
 const isOwner = await verifyTodoOwnership(checklistItem.todo.toString(), userId);
 if (!isOwner) { return res.status(403).json({ message: "Access denied: Unauthorized to update this checklist item" });
 }
 
const updatedChecklistItem = await Checklist.findByIdAndUpdate(
 id,
 { title, status },
 { new: true } 
 );

 res.status(200).json(updatedChecklistItem);
} catch (err) {
 console.error("Error updating checklist item:", err);
 res.status(500).json({ message: "Failed to update checklist item" });
 }
};

// --- DELETE Checklist Item ---
export const deleteChecklistItem = async (req: any, res: Response) => {
 try {
 const { id } = req.params; 
const userId = req.userId; 

 const checklistItem = await Checklist.findById(id);
 if (!checklistItem) {
 return res.status(404).json({ message: "Checklist item not found" });
 }

const isOwner = await verifyTodoOwnership(checklistItem.todo.toString(), userId);
if (!isOwner) {
 return res.status(403).json({ message: "Access denied: Unauthorized to delete this checklist item" });
 }

await Checklist.findByIdAndDelete(id);

 res.status(204).send(); 
 } catch (err) {
console.error("Error deleting checklist item:", err);
 res.status(500).json({ message: "Failed to delete checklist item" });
}
};