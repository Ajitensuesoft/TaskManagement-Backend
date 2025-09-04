"use strict";
// import express from 'express';
// // import { authenticate } from "@clerk/express";
// import {
//   getTodos,
//   createTodo,
//   updateTodo,
//   deleteTodo,
//   sharetodo,
//   allmail,
//   bulkCompleteTodos,
//   bulkDeleteTodos,
//   HistoryController,
//   DeleteHistory,
//   createCsv,
//   importantupdate,
//   archieved,
//   workdata,
//   workupdate,
//   workdelete,
//   getworkChecklistdata,
//   updateChecklist,
//   deleteChecklist,
//   tagemail
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// } from '../controllers/todo.controller';
// import { inviterRole } from '../controllers/todo.controller';
// import{
// getShared,
// postShared,
// deleteShared,
// getNotifications,
// deleteNotification,
// createNotification,
// viewNotification
// }from"../controllers/NoteController"
// import {
// createInvited,
// getInvited
// } from "../controllers/InviterController"
// import {
//     getChecklistItems,
//     createChecklistItem,
//     updateChecklistItem,
//     deleteChecklistItem,
//     getTodoById,
// } from "../controllers/checklistController";
// import { createworspace,deleteworkspace,getworspace } from '../controllers/workspaceController';
// import {createComment,updateComment,deletecomment,showallcomment}from "../controllers/commentController"
// import { saveSubscription } from '../controllers/webpushController';
// import { authenticates } from "../middleware/authenticate";
// import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
// import { acceptInvitation, inviteUser } from '../controllers/InvitingController';
// const router = express.Router();
// // import { saveSubscription, sendTestPush } from "../controllers/pushController";
// import { attachUserId } from '../middleware/attachUserId';
// // router.put("/task/archieved/:id",authenticates,archieved);
// router.get("/task/allmail",allmail);
// // router.post("/subscribe", saveSubscription);
// // router.post("/send-test", sendTestPush);
// // router.get("/task/share",getShared);
// // router.post("/task/share",postShared);
// // router.delete("/task/share/:id",deleteShared);
// router.post('/subscribe', saveSubscription);
// router.get("/task/notifications",getNotifications);
// router.delete("/task/notifications/:id",deleteNotification);
// router.post("/task/notifications",createNotification);
// // import { unifiedAuthenticate } from '../middleware/unifiedAuthenticate ';
// // router.use(authenticates);
// // console.log("attachuserid",attachUserId);
// // router.get('/task',authenticate,attachUserId, getTodos);
// // router.post('/task',authenticate, attachUserId,createTodo);
// // router.put('/task/:id',authenticate, attachUserId,updateTodo);
// // router.delete('/task/:id',authenticate, attachUserId,deleteTodo);
// // // router.get('/task', unifiedAuthenticate, getTodos);
// // router.post('/task', unifiedAuthenticate, createTodo);
// // router.put('/task/:id', unifiedAuthenticate, updateTodo);
// // router.delete('/task/:id', unifiedAuthenticate, deleteTodo);
// //here from 91 to 97 code i wrote down
// router.post("/task/createworkspace",authenticates,createworspace);
// router.put("/task/comment/:editingId",authenticates,updateComment);
// router.delete("/task/comment/:id",authenticates,deletecomment);
// router.get('/task/:workspaceId',authenticates, getTodos);
// router.post('/task/:workspaceId',authenticates, createTodo);
// router.put('/task/:id/:workspaceId',authenticates,updateTodo);
// router.delete('/task/:id/:workspaceId',authenticates,deleteTodo);
// router.post("/task/sharetodo",authenticates,sharetodo )
// router.get("/task/allmail",allmail);
// router.get("/task/share/",authenticates,getShared);
// router.post("/task/share/",authenticates,postShared);
// router.delete("/task/share/:id",authenticates,deleteShared);
// router.get("/task/notifications",authenticates,getNotifications);
// router.delete("/task/notifications/:id",authenticates,deleteNotification);
// router.post("/task/notifications",authenticates,createNotification);
// // router.get('/task',attachUserId, getTodos);
// // router.post('/task',attachUserId, createTodo);
// // router.put('/task/:id',attachUserId,updateTodo);
// // router.delete('/task/:id',attachUserId,deleteTodo);
// //bulk delete or complete
// router.post("/task/bulkcomplete",authenticates,bulkCompleteTodos);
// router.post("/task/bulkdelete",authenticates,bulkDeleteTodos);
// // router.get("/task/viewnotification/:id",authenticates,viewNotification);
// router.get("/task/viewnotification/:id", authenticates, viewNotification);
// router.get("/task/history/:workspaceId",authenticates,HistoryController);
// router.post("/task/history/delete",authenticates,DeleteHistory);
// router.post("/task/csvdata",authenticates,createCsv);
// router.post("/task/importantupdate/:id",authenticates,importantupdate);
// router.get("/task/:id", authenticates, getTodoById);
// router.get("/todos/:todoId/checklist", authenticates, getChecklistItems);
// router.post("/todos/:todoId/checklist", authenticates, createChecklistItem);
// router.put("/checklist/:id", authenticates, updateChecklistItem); 
// router.delete("/checklist/:id", authenticates, deleteChecklistItem);
// //for archieved
// router.put("/task/archieved/:id",authenticates,archieved);
// router.get("/task/workdata/:id",authenticates,workdata);
// router.put("/task/workupdate/:id",authenticates,workupdate);
// router.delete("/task/workdelete/:id",authenticates,workdelete);
// //get checklist of workview
// router.get("/task/getworkchecklistdata/:id",authenticates,getworkChecklistdata);
// router.put('/task/workupdate/checklist/:id', updateChecklist);
// router.delete('/task/workupdate/checklist/:id', deleteChecklist);
// //created invited people
// router.post("/task/createdinvited/:id",authenticates,createInvited);
// router.get("/task/createdinvited/:id",authenticates,getInvited);
// //comments
// router.get("/task/allcomment/:taskId",authenticates,showallcomment);
// router.post("/task/comment/:id",authenticates,createComment);
// router.put("/task/comment/:editingId",authenticates,updateComment);
// router.delete("/task/comment/:id",authenticates,deletecomment);
// //create workspace
// router.post("/task/createworkspace",authenticates,createworspace);
// router.get("/getworkspace",authenticates,getworspace);
// router.delete("/deleteworkspace/:workspaceId",authenticates,deleteworkspace);
// router.post("/inviteruser",authenticates,inviteUser);
// // router.get("/task/getworkspace",authenticates,getWorkspace);
// // router.put("/task/updateworkspace/:id",authenticates,updateWorkspace);
// // router.delete("/task/deleteworkspace/:id",authenticates,deleteWorkspace);
// router.get("/invitesUserole/:receiverId",authenticates,inviterRole);
// router.get("/tagemail",authenticates,tagemail);
// // router.post("/task/createworkspace",authenticates,createworspace);
// // router.put("/task/comment/:editingId",authenticates,updateComment);
// // router.delete("/task/comment/:id",authenticates,deletecomment);
// // router.get('/task/:workspaceId',authenticates, getTodos);
// // router.post('/task/:workspaceId',authenticates, createTodo);
// // router.put('/task/:id/:workspaceId',authenticates,updateTodo);
// // router.delete('/task/:id/:workspaceId',authenticates,deleteTodo);
// export default router;
const express_1 = __importDefault(require("express"));
const authenticate_1 = require("../middleware/authenticate");
const webpushController_1 = require("../controllers/webpushController");
const todo_controller_1 = require("../controllers/todo.controller");
const NoteController_1 = require("../controllers/NoteController");
const InviterController_1 = require("../controllers/InviterController");
const checklistController_1 = require("../controllers/checklistController");
const workspaceController_1 = require("../controllers/workspaceController");
const commentController_1 = require("../controllers/commentController");
const InvitingController_1 = require("../controllers/InvitingController");
const PomodoroController_1 = require("../controllers/PomodoroController");
const router = express_1.default.Router();
//anylitcal dashboard
router.get("/task/anylitical/:workspaceId", authenticate_1.authenticates, todo_controller_1.allWorkspaceStatus);
//timerfunctionality
router.post("/task/timer/start/:id", PomodoroController_1.startTime);
router.post("/task/timer/end/:id", PomodoroController_1.endTime);
router.post("/task/timer/reset/:id", PomodoroController_1.resetTime);
router.post("/task/timer/stop/:id", PomodoroController_1.stopTime);
router.get("/task/timer/:id", PomodoroController_1.getTimerByTodoId);
// 🔔 Notifications
router.get("/task/notifications/:worksapceId", authenticate_1.authenticates, NoteController_1.getNotifications);
router.post("/task/notifications/:workspaceId", authenticate_1.authenticates, NoteController_1.createNotification);
router.delete("/task/notifications/:id", authenticate_1.authenticates, NoteController_1.deleteNotification);
router.get("/task/viewnotification/:id", authenticate_1.authenticates, NoteController_1.viewNotification);
// 📬 Subscription
router.post('/subscribe', webpushController_1.saveSubscription);
// 📧 Mail & Tagging
router.get("/task/allmail", authenticate_1.authenticates, todo_controller_1.allmail);
router.get("/tagemail", authenticate_1.authenticates, todo_controller_1.tagemail);
// 📤 Shared Tasks
router.get("/task/share/:workspaceId", authenticate_1.authenticates, NoteController_1.getShared);
router.post("/task/sharetodo/:workspaceId", authenticate_1.authenticates, todo_controller_1.sharetodo);
router.post("/task/share/:workspaceId", authenticate_1.authenticates, NoteController_1.postShared);
router.delete("/task/share/:id", authenticate_1.authenticates, NoteController_1.deleteShared);
// 🧠 History & CSV
router.get("/task/history/:workspaceId", authenticate_1.authenticates, todo_controller_1.HistoryController);
router.post("/task/history/delete", authenticate_1.authenticates, todo_controller_1.DeleteHistory);
router.post("/task/csvdata", authenticate_1.authenticates, todo_controller_1.createCsv);
// ✅ Bulk Actions
router.post("/task/bulkcomplete", authenticate_1.authenticates, todo_controller_1.bulkCompleteTodos);
router.post("/task/bulkdelete", authenticate_1.authenticates, todo_controller_1.bulkDeleteTodos);
// 📌 Important & Archived
router.post("/task/importantupdate/:id", authenticate_1.authenticates, todo_controller_1.importantupdate);
router.put("/task/archieved/:id", authenticate_1.authenticates, todo_controller_1.archieved);
// 🧠 Workspace
router.post("/task/createworkspace", authenticate_1.authenticates, workspaceController_1.createworspace);
router.get("/getworkspace", authenticate_1.authenticates, workspaceController_1.getworspace);
router.delete("/deleteworkspace/:workspaceId", authenticate_1.authenticates, workspaceController_1.deleteworkspace);
// 👥 Invites & Roles
router.post("/inviteruser", authenticate_1.authenticates, InvitingController_1.inviteUser);
router.get("/invitesUserole/:receiverId", authenticate_1.authenticates, todo_controller_1.inviterRole);
router.post("/task/createdinvited/:id", authenticate_1.authenticates, InviterController_1.createInvited);
router.get("/task/createdinvited/:id", authenticate_1.authenticates, InviterController_1.getInvited);
// 📝 Comments
router.get("/task/allcomment/:taskId", authenticate_1.authenticates, commentController_1.showallcomment);
router.post("/task/comment/:id", authenticate_1.authenticates, commentController_1.createComment);
router.put("/task/comment/:editingId", authenticate_1.authenticates, commentController_1.updateComment);
router.delete("/task/comment/:id", authenticate_1.authenticates, commentController_1.deletecomment);
// 📋 Checklist (Work View)
router.get("/task/getworkchecklistdata/:id", authenticate_1.authenticates, todo_controller_1.getworkChecklistdata);
router.put("/task/workupdate/checklist/:id", authenticate_1.authenticates, todo_controller_1.updateChecklist);
router.delete("/task/workupdate/checklist/:id", authenticate_1.authenticates, todo_controller_1.deleteChecklist);
// 📋 Checklist (Todos)
router.get("/todos/:todoId/checklist", authenticate_1.authenticates, checklistController_1.getChecklistItems);
router.post("/todos/:todoId/checklist", authenticate_1.authenticates, checklistController_1.createChecklistItem);
router.put("/checklist/:id", authenticate_1.authenticates, checklistController_1.updateChecklistItem);
router.delete("/checklist/:id", authenticate_1.authenticates, checklistController_1.deleteChecklistItem);
// 🧠 Work Data
router.get("/task/workdata/:id", authenticate_1.authenticates, todo_controller_1.workdata);
router.put("/task/workupdate/:id", authenticate_1.authenticates, todo_controller_1.workupdate);
router.delete("/task/workdelete/:id", authenticate_1.authenticates, todo_controller_1.workdelete);
// ✅ Todos (Workspace Scoped)
router.get('/task/:workspaceId', authenticate_1.authenticates, todo_controller_1.getTodos);
router.post('/task/:workspaceId', authenticate_1.authenticates, todo_controller_1.createTodo);
router.put('/task/:id/:workspaceId', authenticate_1.authenticates, todo_controller_1.updateTodo);
router.delete('/task/:id/:workspaceId', authenticate_1.authenticates, todo_controller_1.deleteTodo);
router.post("/task/sharetodo", authenticate_1.authenticates, todo_controller_1.sharetodo);
// 🧾 Single Todo (Generic Route — MUST BE LAST)
router.get("/task/:id", authenticate_1.authenticates, checklistController_1.getTodoById);
exports.default = router;
