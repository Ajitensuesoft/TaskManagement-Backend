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
// // router.put("/task/archieved/:id", archieved);
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
// router.post("/task/createworkspace", createworspace);
// router.put("/task/comment/:editingId", updateComment);
// router.delete("/task/comment/:id", deletecomment);
// router.get('/task/:workspaceId',  getTodos);
// router.post('/task/:workspaceId',  createTodo);
// router.put('/task/:id/:workspaceId', updateTodo);
// router.delete('/task/:id/:workspaceId', deleteTodo);
// router.post("/task/sharetodo", sharetodo )
// router.get("/task/allmail",allmail);

// router.get("/task/share/", getShared);
// router.post("/task/share/", postShared);
// router.delete("/task/share/:id", deleteShared);

// router.get("/task/notifications", getNotifications);
// router.delete("/task/notifications/:id", deleteNotification);
// router.post("/task/notifications", createNotification);

// // router.get('/task',attachUserId, getTodos);
// // router.post('/task',attachUserId, createTodo);
// // router.put('/task/:id',attachUserId,updateTodo);
// // router.delete('/task/:id',attachUserId,deleteTodo);


// //bulk delete or complete

// router.post("/task/bulkcomplete", bulkCompleteTodos);
// router.post("/task/bulkdelete", bulkDeleteTodos);

// // router.get("/task/viewnotification/:id", viewNotification);
// router.get("/task/viewnotification/:id",   viewNotification);


// router.get("/task/history/:workspaceId", HistoryController);
// router.post("/task/history/delete", DeleteHistory);
// router.post("/task/csvdata", createCsv);
// router.post("/task/importantupdate/:id", importantupdate);





// router.get("/task/:id",   getTodoById);
// router.get("/todos/:todoId/checklist",   getChecklistItems);
// router.post("/todos/:todoId/checklist",   createChecklistItem);
// router.put("/checklist/:id",   updateChecklistItem); 
// router.delete("/checklist/:id",   deleteChecklistItem);


// //for archieved

// router.put("/task/archieved/:id", archieved);


// router.get("/task/workdata/:id", workdata);
// router.put("/task/workupdate/:id", workupdate);
// router.delete("/task/workdelete/:id", workdelete);


// //get checklist of workview
// router.get("/task/getworkchecklistdata/:id", getworkChecklistdata);
// router.put('/task/workupdate/checklist/:id', updateChecklist);
// router.delete('/task/workupdate/checklist/:id', deleteChecklist);



// //created invited people

// router.post("/task/createdinvited/:id", createInvited);
// router.get("/task/createdinvited/:id", getInvited);



// //comments

// router.get("/task/allcomment/:taskId", showallcomment);
// router.post("/task/comment/:id", createComment);
// router.put("/task/comment/:editingId", updateComment);
// router.delete("/task/comment/:id", deletecomment);


// //create workspace

// router.post("/task/createworkspace", createworspace);
// router.get("/getworkspace", getworspace);
// router.delete("/deleteworkspace/:workspaceId", deleteworkspace);
// router.post("/inviteruser", inviteUser);
// // router.get("/task/getworkspace", getWorkspace);
// // router.put("/task/updateworkspace/:id", updateWorkspace);
// // router.delete("/task/deleteworkspace/:id", deleteWorkspace);



// router.get("/invitesUserole/:receiverId", inviterRole);


// router.get("/tagemail", tagemail);












// // router.post("/task/createworkspace", createworspace);
// // router.put("/task/comment/:editingId", updateComment);
// // router.delete("/task/comment/:id", deletecomment);
// // router.get('/task/:workspaceId',  getTodos);
// // router.post('/task/:workspaceId',  createTodo);
// // router.put('/task/:id/:workspaceId', updateTodo);
// // router.delete('/task/:id/:workspaceId', deleteTodo);
// export default router;













































import express from 'express';
import { authenticates } from "../middleware/authenticate";
import { saveSubscription } from '../controllers/webpushController';
import { attachUserId } from '../middleware/attachUserId';
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';

import {
  getTodos, createTodo, updateTodo, deleteTodo, sharetodo, allmail,
  bulkCompleteTodos, bulkDeleteTodos, HistoryController, DeleteHistory,
  createCsv, importantupdate, archieved, workdata, workupdate, workdelete,
  getworkChecklistdata, updateChecklist, deleteChecklist, tagemail,
  inviterRole,allWorkspaceStatus
} from '../controllers/todo.controller';

import {
  getShared, postShared, deleteShared,
  getNotifications, deleteNotification, createNotification, viewNotification
} from "../controllers/NoteController";

import {
  createInvited, getInvited
} from "../controllers/InviterController";

import {
  getChecklistItems, createChecklistItem, updateChecklistItem,
  deleteChecklistItem, getTodoById
} from "../controllers/checklistController";

import {
  createworspace, deleteworkspace, getworspace
} from '../controllers/workspaceController';

import {
  createComment, updateComment, deletecomment, showallcomment
} from "../controllers/commentController";

import {
  acceptInvitation, inviteUser
} from '../controllers/InvitingController';


import{
startTime,endTime,resetTime,stopTime,getTimerByTodoId
}from "../controllers/PomodoroController"

const router = express.Router();

//anylitcal dashboard

router.get("/task/anylitical/:workspaceId", allWorkspaceStatus);



//timerfunctionality

router.post("/task/timer/start/:id",startTime);
router.post("/task/timer/end/:id",endTime);
router.post("/task/timer/reset/:id",resetTime);
router.post("/task/timer/stop/:id",stopTime);
router.get("/task/timer/:id", getTimerByTodoId);



// 🔔 Notifications
router.get("/task/notifications/:worksapceId",   getNotifications);
router.post("/task/notifications/:workspaceId",   createNotification);
router.delete("/task/notifications/:id",   deleteNotification);
router.get("/task/viewnotification/:id",   viewNotification);

// 📬 Subscription
router.post('/subscribe', saveSubscription);

// 📧 Mail & Tagging
router.get("/task/allmail",   allmail);
router.get("/tagemail",   tagemail);

// 📤 Shared Tasks
router.get("/task/share/:workspaceId",   getShared);
router.post("/task/sharetodo/:workspaceId", sharetodo )
router.post("/task/share/:workspaceId",   postShared);
router.delete("/task/share/:id",   deleteShared);

// 🧠 History & CSV
router.get("/task/history/:workspaceId",   HistoryController);
router.post("/task/history/delete",   DeleteHistory);
router.post("/task/csvdata",   createCsv);

// ✅ Bulk Actions
router.post("/task/bulkcomplete",   bulkCompleteTodos);
router.post("/task/bulkdelete",   bulkDeleteTodos);

// 📌 Important & Archived
router.post("/task/importantupdate/:id",   importantupdate);
router.put("/task/archieved/:id",   archieved);

// 🧠 Workspace
router.post("/task/createworkspace",   createworspace);
router.get("/getworkspace",   getworspace);
router.delete("/deleteworkspace/:workspaceId",   deleteworkspace);

// 👥 Invites & Roles
router.post("/inviteruser",   inviteUser);
router.get("/invitesUserole/:receiverId",   inviterRole);
router.post("/task/createdinvited/:id",   createInvited);
router.get("/task/createdinvited/:id",   getInvited);

// 📝 Comments
router.get("/task/allcomment/:taskId",   showallcomment);
router.post("/task/comment/:id",   createComment);
router.put("/task/comment/:editingId",   updateComment);
router.delete("/task/comment/:id",   deletecomment);

// 📋 Checklist (Work View)
router.get("/task/getworkchecklistdata/:id",   getworkChecklistdata);
router.put("/task/workupdate/checklist/:id",   updateChecklist);
router.delete("/task/workupdate/checklist/:id",   deleteChecklist);

// 📋 Checklist (Todos)
router.get("/todos/:todoId/checklist",   getChecklistItems);
router.post("/todos/:todoId/checklist",   createChecklistItem);
router.put("/checklist/:id",   updateChecklistItem);
router.delete("/checklist/:id",   deleteChecklistItem);

// 🧠 Work Data
router.get("/task/workdata/:id",   workdata);
router.put("/task/workupdate/:id",   workupdate);
router.delete("/task/workdelete/:id",   workdelete);

// ✅ Todos (Workspace Scoped)
router.get('/task/:workspaceId',   getTodos);
router.post('/task/:workspaceId',   createTodo);
router.put('/task/:id/:workspaceId',   updateTodo);
router.delete('/task/:id/:workspaceId',   deleteTodo);
router.post("/task/sharetodo",   sharetodo);

// 🧾 Single Todo (Generic Route — MUST BE LAST)
router.get("/task/:id",   getTodoById);

export default router;
