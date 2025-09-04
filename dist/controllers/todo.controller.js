"use strict";
// import { Request, Response } from "express";
// import Todo from "../models/todo.model";
// import { sendEmail } from "../utils/mailer";
// import User from '../models/usermodel';
// import History from "../models/HistoryModel";
// // GET all todos for logged-in user
// export const getTodos = async (req: any, res: Response) => {
//   try {
//     console.log("userId",req.userId);
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.allWorkspaceStatus = exports.tagemail = exports.inviterRole = exports.deleteChecklist = exports.updateChecklist = exports.getworkChecklistdata = exports.workdelete = exports.workupdate = exports.workdata = exports.archieved = exports.importantupdate = exports.createCsv = exports.DeleteHistory = exports.HistoryController = exports.bulkCompleteTodos = exports.bulkDeleteTodos = exports.allmail = exports.sharetodo = exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const todo_model_1 = __importDefault(require("../models/todo.model"));
const mailer_1 = require("../utils/mailer");
const usermodel_1 = __importDefault(require("../models/usermodel")); // Assuming 'usermodel' is your user model file
const HistoryModel_1 = __importDefault(require("../models/HistoryModel"));
const checklist_model_1 = __importDefault(require("../models/checklist.model"));
// Import the configured webpush instance and the sendNotification utility
const webpushController_1 = require("./webpushController"); // Adjust path if necessary
const InviteModel_1 = __importDefault(require("../models/InviteModel"));
const usermodel_2 = __importDefault(require("../models/usermodel"));
const WorkSpaceModel_1 = __importDefault(require("../models/WorkSpaceModel"));
// Helper function to send notification (to avoid repetition)
const sendPushNotification = async (userId, title, body) => {
    try {
        const user = await usermodel_1.default.findById(userId);
        if (user && user.subscription) {
            const payload = JSON.stringify({ title, body });
            await (0, webpushController_1.sendNotification)(user.subscription, payload);
            console.log(`Push notification sent to user ${userId} for: ${title}`);
        }
        else {
            console.log(`User ${userId} has no active subscription or user not found.`);
        }
    }
    catch (notificationError) {
        console.error(`Error sending push notification to user ${userId}:`, notificationError);
        // Continue execution, don't block the main API response
    }
};
// GET all todos for logged-in user
const getTodos = async (req, res) => {
    let workspaceId = req.params.workspaceId;
    console.log("workspaceId", workspaceId);
    try {
        console.log("userId", req.userId);
        const userId = req.userId;
        console.log("userid", userId);
        const todos = await todo_model_1.default.find({ workspaceId });
        console.log("todos", todos);
        res.json(todos);
    }
    catch (err) {
        console.error("Error fetching todos:", err);
        res.status(500).json({ message: "Failed to fetch todos" });
    }
};
exports.getTodos = getTodos;
// CREATE new todo
const createTodo = async (req, res) => {
    const alldata = req.body;
    console.log("alldata", alldata);
    try {
        let workspaceId = req.params.workspaceId; //1change and schema change start from here
        console.log("workspaceId", workspaceId);
        const userId = req.userId;
        console.log("userId", userId);
        const { title, description, status, priority, duedate, customFields } = req.body;
        console.log(title, description, status, priority, duedate, customFields);
        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }
        const newTodo = await todo_model_1.default.create({
            workspaceId: workspaceId,
            userId,
            title,
            description,
            priority,
            duedate,
            status: status || "pending", // default to pending if not provided
            customFields,
        });
        console.log("newTodo", newTodo);
        const Hist = await HistoryModel_1.default.create({
            workspaceId: workspaceId,
            userId: userId,
            taskId: newTodo._id,
            taskname: newTodo.title,
            action: "CREATE",
            duedate: newTodo.duedate,
            details: { after: newTodo }
        });
        console.log("history of create", Hist);
        // Send push notification for new todo
        await sendPushNotification(userId, 'New Task Created!', `Title: ${newTodo.title}`);
        res.status(201).json(newTodo);
    }
    catch (err) {
        console.error("Error creating todo:", err);
        res.status(500).json({ message: "Failed to create todo" });
    }
};
exports.createTodo = createTodo;
// UPDATE a todo
// export const updateTodo = async (req: Request, res: Response) => {
//   let  alldataofupdate=req.body;
//   console.log("alldataofupdate",alldataofupdate);
//    let workspaceId=(req as any).params.workspaceId ;    
//   try {
//     const userId = (req as any).userId;
//     const { id } = req.params;
//     const { title, description, status, priority } = req.body;
//     const olddata = await Todo.findOne({ _id: id, workspaceId });      //here i changed userid to workspaceid
//     const updated = await Todo.findOneAndUpdate(
//       { _id: id, workspaceId },
//       { title, description, status, priority },
//       { new: true }
//     );
//     if (!updated) {
//       return res.status(404).json({ message: "Todo not found" });
//     }
//     // Send push notification for updated todo
//     await sendPushNotification(
//       userId,
//       'Task Updated!',
//       `Title: ${updated.title} Status: ${updated.status}`
//     );
//     res.json(updated);
//     const Hist = await History.create({
//       workspaceId:workspaceId,
//       userId: userId,
//       taskId: updated._id,
//       taskname: updated.title,
//       action: "UPDATE",
//       details: { old: olddata, after: updated }
//     })
//     console.log("history of updated", Hist);
//   } catch (err) {
//     console.error("Error updating todo:", err);
//     res.status(500).json({ message: "Failed to update todo" });
//   }
// };
const updateTodo = async (req, res) => {
    let alldataofupdate = req.body;
    console.log("alldataofupdate", alldataofupdate);
    let workspaceId = req.params.workspaceId;
    try {
        const userId = req.userId;
        const { id } = req.params;
        const olddata = await todo_model_1.default.findOne({ _id: id, workspaceId });
        if (!olddata) {
            return res.status(404).json({ message: "Todo not found" });
        }
        const updated = await todo_model_1.default.findOneAndUpdate({ _id: id, workspaceId }, req.body, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Todo not found after update" });
        }
        await sendPushNotification(userId, 'Task Updated!', `Title: ${updated.title} Status: ${updated.status}`);
        res.json(updated);
        // Record the history with the old and new data, including customFields
        const Hist = await HistoryModel_1.default.create({
            workspaceId: workspaceId,
            userId: userId,
            taskId: updated._id,
            taskname: updated.title,
            action: "UPDATE",
            details: { old: olddata, after: updated }
        });
        console.log("history of updated", Hist);
    }
    catch (err) {
        console.error("Error updating todo:", err);
        res.status(500).json({ message: "Failed to update todo" });
    }
};
exports.updateTodo = updateTodo;
// DELETE a todo
const deleteTodo = async (req, res) => {
    let workspaceId = req.params.workspaceId;
    try {
        const userId = req.userId;
        const { id } = req.params;
        const olddata = await todo_model_1.default.findOne({ _id: id, workspaceId });
        const deleted = await todo_model_1.default.findOneAndDelete({ _id: id, workspaceId }); //here both place i change userid to workspaceid
        if (!deleted) {
            return res.status(404).json({ message: "Todo not found" });
        }
        const Hist = await HistoryModel_1.default.create({
            workspaceId: workspaceId,
            userId: userId,
            taskId: deleted._id,
            taskname: deleted.title,
            action: "DELETE",
            details: { before: olddata }
        });
        console.log("history of updated", Hist);
        // Send push notification for deleted todo
        await sendPushNotification(userId, 'Task Deleted!', `Title: ${deleted.title} was removed.`);
        res.status(204).send();
    }
    catch (err) {
        console.error("Error deleting todo:", err);
        res.status(500).json({ message: "Failed to delete todo" });
    }
};
exports.deleteTodo = deleteTodo;
const sharetodo = async (req, res) => {
    let workspaceId = req.params.workspaceId; //here i changed something
    const { taskId, email } = req.body;
    const userId = req.userId;
    if (!taskId || !email) {
        return res.status(400).json({ message: "Task ID and email required" });
    }
    const task = await todo_model_1.default.findOne({ _id: taskId, userId });
    if (!task)
        return res.status(404).json({ message: "Task not found" });
    try {
        let data = await (0, mailer_1.sendEmail)(email, `Task Shared`, `Title: ${task.title}\nDescription: ${task.description}`);
        console.log("recieved sender", data);
        const Hist = await HistoryModel_1.default.create({
            workspaceId: workspaceId,
            userId: userId,
            taskId: task._id,
            taskname: task.title,
            action: "SHARE",
            details: { sharedwith: email }
        });
        console.log("history of updated", Hist);
        // Send push notification to the sharing user
        await sendPushNotification(userId, 'Task Shared!', `You shared "${task.title}" with ${email}.`);
        res.json({ success: true, message: "Task shared successfully", data: data });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to send email" });
    }
};
exports.sharetodo = sharetodo;
const allmail = async (req, res) => {
    try {
        // const docs = await User.find();
        // console.log("All docs in Todo collection:", docs);
        const mails = await usermodel_1.default.find().distinct("email");
        console.log("Distinct emails:", mails);
        return res.status(200).json(mails);
    }
    catch (err) {
        console.error("Error fetching emails:", err);
        return res.status(500).json({ message: "Failed to load all emails" });
    }
};
exports.allmail = allmail;
const bulkDeleteTodos = async (req, res) => {
    try {
        const { ids } = req.body; // array of todo _id
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "No task IDs provided" });
        }
        // Get the userId from the request (assuming middleware sets it)
        const userId = req.userId;
        const deletedTodos = await todo_model_1.default.find({ _id: { $in: ids }, userId }); // Find the todos to get their titles for notifications
        await todo_model_1.default.deleteMany({ _id: { $in: ids }, userId });
        // Send individual notifications for bulk delete
        for (const todo of deletedTodos) {
            await sendPushNotification(userId, 'Task Deleted (Bulk Action)!', `Title: ${todo.title} was removed.`);
        }
        res.json({ success: true, message: "Tasks deleted successfully" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to delete tasks" });
    }
};
exports.bulkDeleteTodos = bulkDeleteTodos;
const bulkCompleteTodos = async (req, res) => {
    try {
        const { ids } = req.body; // array of todo _id
        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return res.status(400).json({ message: "No task IDs provided" });
        }
        // Get the userId from the request (assuming middleware sets it)
        const userId = req.userId;
        const completedTodos = await todo_model_1.default.find({ _id: { $in: ids }, userId }); // Find the todos to get their titles for notifications
        await todo_model_1.default.updateMany({ _id: { $in: ids }, userId }, { status: "Completed" });
        // Send individual notifications for bulk complete
        for (const todo of completedTodos) {
            await sendPushNotification(userId, 'Task Completed (Bulk Action)!', `Title: ${todo.title} is now completed.`);
        }
        res.json({ success: true, message: "Tasks marked as complete" });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Failed to update tasks" });
    }
};
exports.bulkCompleteTodos = bulkCompleteTodos;
const HistoryController = async (req, res) => {
    let workspaceId = req.params.workspaceId;
    console.log(workspaceId);
    try {
        const userId = req.userId;
        console.log(userId);
        const history = await HistoryModel_1.default.find({ workspaceId });
        res.json(history);
    }
    catch (err) {
        console.error("Error fetching history:", err);
        res.status(500).json({ message: "Failed to fetch history" });
    }
};
exports.HistoryController = HistoryController;
const DeleteHistory = async (req, res) => {
    try {
        let { id } = req.params;
        let userId = req.userId;
        let deleted = await HistoryModel_1.default.findByIdAndDelete({ _id: id, userId });
        if (!deleted) {
            return res.status(404).json({ message: "History not found" });
        }
        res.status(204).json({
            message: "History deleted successfully"
        });
    }
    catch (err) {
        console.error("some error:", err);
        res.status(500).json({ message: "internal server errror" });
    }
};
exports.DeleteHistory = DeleteHistory;
const createCsv = async (req, res) => {
    let userId = req.userId;
    console.log("userId", userId);
    try {
        let parsedata = req.body;
        console.log("parse data in backend", parsedata);
        console.log("csv data in backend", parsedata, userId);
        let finaldata = await todo_model_1.default.insertMany(parsedata?.map((d) => ({
            userId,
            title: d.title,
            description: d.description,
            priority: d.priority,
            status: d.status,
        })));
        console.log("all csv data", finaldata);
        // Send push notification for CSV import
        await sendPushNotification(userId, 'Tasks Imported!', `You imported ${finaldata.length} tasks from a CSV file.`);
        return res.status(200).json({
            message: "data got successfully",
            parsedata: parsedata,
        });
    }
    catch (err) {
        console.log("error in csv", err);
        res.status(500).json({ message: "internal server errror" });
    }
};
exports.createCsv = createCsv;
const importantupdate = async (req, res) => {
    let { id } = req.params;
    console.log("id is", id);
    let { isImprtant } = req.body;
    console.log('data of important', isImprtant);
    let userId = req.userId;
    try {
        let updatedata = await todo_model_1.default.findOneAndUpdate({ _id: id, userId }, { important: isImprtant }, { new: true });
        res.status(200).json({
            message: "data got successfully",
            updatedata: updatedata,
        });
        console.log("updated data", updatedata);
    }
    catch (err) {
        console.log("error in csv", err);
        res.status(500).json({ message: "internal server errror" });
    }
};
exports.importantupdate = importantupdate;
const archieved = async (req, res) => {
    let { id } = req.params;
    let userId = req.userId;
    let { data } = req.body;
    console.log("backedn archieved data", data, userId, id);
    try {
        let updatedata = await todo_model_1.default.findOneAndUpdate({ _id: id, userId }, { archieved: data }, { new: true });
        console.log("archievedupdated data", updatedata);
        return res.status(200).json({
            message: "data got successfully",
            updatedata: updatedata,
        });
        console.log("updated data", updatedata);
    }
    catch (err) {
        console.log("error in csv", err);
        return res.status(500).json({ message: "internal server errror" });
    }
};
exports.archieved = archieved;
//for work notification write api to fetch data
const workdata = async (req, res) => {
    let { id } = req.params;
    const { userId: userId } = req.query;
    console.log("fakeuserid", userId);
    //  let userId=(req as any).userId;
    // const userId=id;
    console.log("userid of work", id);
    try {
        let data = await todo_model_1.default.find({ _id: id, userId });
        console.log("work data", data);
        return res.status(200).json({
            message: "data got successfully",
            data: data,
        });
    }
    catch (err) {
        console.log("err", err);
        return res.status(500).json("message internal server error");
    }
};
exports.workdata = workdata;
const workupdate = async (req, res) => {
    try {
        // const userId = (req as any).userId;
        const { id } = req.params;
        console.log("id of task", id);
        const { title, description, status, priority, userId } = req.body;
        console.log("userid", userId);
        // const olddata = await Todo.findOne({ _id: id, userId });
        console.log("updated work data", title, description, status, priority, userId, id);
        const singledata = await todo_model_1.default.findOne({ _id: id, userId });
        console.log("singledata of updatework", singledata);
        const updated = await todo_model_1.default.findOneAndUpdate({ _id: id, userId }, { title, description, status, priority }, { new: true });
        if (!updated) {
            return res.status(404).json({ message: "Todo not found" });
        }
        return res.status(200).json({
            message: "data got updated successfully",
            updated: updated
        });
    }
    catch (err) {
        return res.status(500).json({
            message: "internal server error",
        });
    }
};
exports.workupdate = workupdate;
const workdelete = async (req, res) => {
    let { id } = req.params;
    let { userId: userId } = req.query;
    console.log("userId", userId);
    try {
        let data = await todo_model_1.default.deleteOne({ _id: id, userId });
        console.log("work data", data);
        return res.status(200).json({
            message: "data got successfully",
            data: data,
        });
    }
    catch (err) {
        console.log("err", err);
        return res.status(500).json("message internal server error");
    }
};
exports.workdelete = workdelete;
//get checklist data
const getworkChecklistdata = async (req, res) => {
    let { id } = req.params;
    const { userId: userId } = req.query;
    console.log("fakeuserid", userId);
    //  let userId=(req as any).userId;
    // const userId=id;
    console.log("todo id of work", id);
    try {
        let data = await checklist_model_1.default.find({ todo: id });
        console.log("work data", data);
        return res.status(200).json({
            message: "data got successfully",
            data: data,
        });
    }
    catch (err) {
        console.log("err", err);
        return res.status(500).json("message internal server error");
    }
};
exports.getworkChecklistdata = getworkChecklistdata;
const updateChecklist = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedChecklist = await checklist_model_1.default.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedChecklist) {
            return res.status(404).json({ message: "Checklist item not found" });
        }
        res.status(200).json({ message: "Checklist updated", data: updatedChecklist });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.updateChecklist = updateChecklist;
// Delete a checklist item
const deleteChecklist = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedChecklist = await checklist_model_1.default.findByIdAndDelete(id);
        if (!deletedChecklist) {
            return res.status(404).json({ message: "Checklist item not found" });
        }
        res.status(200).json({ message: "Checklist deleted" });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.deleteChecklist = deleteChecklist;
const inviterRole = async (req, res) => {
    let receiverId = req.params.receiverId;
    try {
        let userfind = await InviteModel_1.default.find({ receiverId: receiverId });
        console.log("userfind", userfind);
        return res.status(200).json({
            message: "data got successfully",
            data: userfind,
        });
    }
    catch (err) {
        res.status(500).json({ message: "Server error" });
    }
};
exports.inviterRole = inviterRole;
const tagemail = async (req, res) => {
    let value = req.query.value;
    console.log("value", value);
    try {
        if (value == '@') {
            let fetchgmail = await usermodel_2.default.find();
            console.log("all fetchgmail", fetchgmail);
            return res.status(200).json({
                message: "all mail got",
                data: fetchgmail,
            });
        }
        else {
            return res.status(404).json({
                message: "no any mail exist"
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: "internal error exist"
        });
    }
};
exports.tagemail = tagemail;
//analytic dashboard
const allWorkspaceStatus = async (req, res) => {
    const workspaceId = req.params.workspaceId;
    console.log("workspaceId", workspaceId);
    try {
        // get all todos
        const todos = await todo_model_1.default.find({ workspaceId: workspaceId });
        console.log("todos of workspace", todos);
        // get workspace details (with members)
        const workspace = await WorkSpaceModel_1.default.findById({ _id: workspaceId });
        console.log("allworkspaceData", workspace);
        // .populate("members", "name email");
        return res.status(200).json({
            message: "Data fetched successfully",
            workspace, // 👈 full workspace details
            todos // 👈 todos for that workspace
        });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal error occurred"
        });
    }
};
exports.allWorkspaceStatus = allWorkspaceStatus;
