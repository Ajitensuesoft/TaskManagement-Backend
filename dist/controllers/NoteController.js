"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewNotification = exports.deleteNotification = exports.getNotifications = exports.createNotification = exports.deleteShared = exports.postShared = exports.getShared = void 0;
const Sharedmodel_1 = __importDefault(require("../models/Sharedmodel"));
const NotificationModel_1 = __importDefault(require("../models/NotificationModel"));
const todo_model_1 = __importDefault(require("../models/todo.model"));
const HistoryModel_1 = __importDefault(require("../models/HistoryModel"));
// export const getShared=async(req:Request,res:Response)=>{
//     try{
//         const shared=await Sharedmodel.find()
//         console.log("shared",shared);
//         return res.status(200).json({
//             data:shared,
//         })
//     }
//     catch(err){
//         console.log(err);
//         return res.status(500).json({
//             message:"Server error"
//         })
//     }
// }
// export const getShared = async (req: Request, res: Response) => {
//   try {
//     const email = req.query.email as string; // sender email
//     if (!email) {
//       return res.status(400).json({ message: "Sender email is required" });
//     }
//     // Only get items where 'from' matches the sender
//     const shared = await Sharedmodel.find({ from: email });
//     res.status(200).json({ data: shared });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
const getShared = async (req, res) => {
    let workspaceId = req.params.workspaceId;
    console.log("workspaceID OF GETSHARED", workspaceId);
    try {
        // const { email } = req.query; // email of the sender
        // if (!email || typeof email !== "string") {
        //   return res.status(400).json({ message: "Sender email is required" });
        // }
        // console.log(localStorage.getItem("email"));
        //  localStorage.getItem("email")
        // Find all shared tasks where 'from' matches the sender's email
        const shared = await Sharedmodel_1.default.find({ workspaceId: workspaceId }).sort({ createdAt: -1 });
        const Hist = await HistoryModel_1.default.create({
            workspaceId: workspaceId,
            userId: "blank",
            taskId: "All task",
            taskname: "All shared Task",
            action: "SHARE",
            details: { sharedwith: "gamer" }
        });
        console.log("history of updated", Hist);
        return res.status(200).json({
            data: shared,
        });
    }
    catch (err) {
        console.error("Error fetching shared tasks:", err);
        return res.status(500).json({
            message: "Server error",
        });
    }
};
exports.getShared = getShared;
const postShared = async (req, res) => {
    let workspaceId = req.params.workspaceId;
    console.log("workspaceId in postshared", workspaceId);
    try {
        const { from, to, title, taskId } = req.body;
        console.log("shared", from, to, title, taskId);
        // get sender's email from Clerk or JWT auth
        // const senderEmail =  req.body.from; 
        // console.log("senderemail",senderEmail);
        // if (!senderEmail) {
        //   return res.status(400).json({ message: "Sender email is required" });
        // }
        const shared = await Sharedmodel_1.default.create({
            from,
            to,
            title,
            taskId
        });
        console.log("shared", shared);
        const Hist = await HistoryModel_1.default.create({
            workspaceId: workspaceId,
            userId: req.userId,
            taskId: taskId,
            taskname: title,
            action: "SHARE",
            details: { sharedwith: to }
        });
        console.log("history of updated", Hist);
        return res.status(201).json({ data: shared });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.postShared = postShared;
const deleteShared = async (req, res) => {
    try {
        const { id } = req.params; // shared record _id
        const deleted = await Sharedmodel_1.default.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Shared record not found" });
        }
        return res.status(200).json({ message: "Shared task removed successfully" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.deleteShared = deleteShared;
const createNotification = async (req, res) => {
    let workspaceId = req.params.workspaceId;
    console.log("notification workspaceId", workspaceId);
    try {
        const { from, message, to, taskId, userId } = req.body;
        console.log('getnotification', from, message, to, userId);
        if (!from || !message) {
            return res.status(400).json({ message: "From and message are required" });
        }
        const notification = await NotificationModel_1.default.create({ from, message, to, taskId, userId, workspaceId });
        console.log("notification", notification);
        return res.status(201).json({
            message: "Notification created successfully",
            data: notification,
        });
    }
    catch (error) {
        console.error("Error creating notification:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.createNotification = createNotification;
// export const getNotifications = async (req: Request, res: Response) => {
//   try {
//     const notifications = await NotificationModel.find().sort({ createdAt: -1 });
//     return res.status(200).json(notifications);
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
const getNotifications = async (req, res) => {
    let workspaceId = req.params.workspaceId;
    console.log("getnotification workspace", workspaceId);
    try {
        const email = req.query.email; // receiver email
        console.log("email", email);
        // if (!email) {
        //   return res.status(400).json({ message: "Receiver email is required" });
        // }
        // Only get notifications for this receiver
        const notifications = await NotificationModel_1.default.find({ workspaceId: workspaceId });
        console.log("notifications", notifications);
        res.status(200).json({ data: notifications });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.getNotifications = getNotifications;
const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await NotificationModel_1.default.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Notification not found" });
        }
        return res.status(200).json({ message: "Notification deleted successfully" });
    }
    catch (error) {
        console.error("Error deleting notification:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
exports.deleteNotification = deleteNotification;
const viewNotification = async (req, res) => {
    const { id } = req.params; // from URL: /task/viewnotification/:id
    const userId = req.userId; // from auth middleware
    console.log("taskId", id);
    console.log("userId", userId);
    try {
        // Search by both _id and userId
        const viewdata = await todo_model_1.default.findOne({
            _id: id,
        });
        console.log("viewdata", viewdata);
        if (!viewdata) {
            return res.status(404).json({ message: "Notification does not exist" });
        }
        res.status(200).json(viewdata);
    }
    catch (err) {
        console.error("Error viewing notification:", err);
        res.status(500).json({ message: "Server error" });
    }
};
exports.viewNotification = viewNotification;
