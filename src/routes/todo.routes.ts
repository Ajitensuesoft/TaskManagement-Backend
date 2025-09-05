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

router.get("/task/anylitical/:workspaceId",authenticates,allWorkspaceStatus);



//timerfunctionality

router.post("/task/timer/start/:id",startTime);
router.post("/task/timer/end/:id",endTime);
router.post("/task/timer/reset/:id",resetTime);
router.post("/task/timer/stop/:id",stopTime);
router.get("/task/timer/:id", getTimerByTodoId);



// 🔔 Notifications
router.get("/task/notifications/:worksapceId", authenticates, getNotifications);
router.post("/task/notifications/:workspaceId", authenticates, createNotification);
router.delete("/task/notifications/:id", authenticates, deleteNotification);
router.get("/task/viewnotification/:id", authenticates, viewNotification);

// 📬 Subscription
router.post('/subscribe', saveSubscription);

// 📧 Mail & Tagging
router.get("/task/allmail", authenticates, allmail);
router.get("/tagemail", authenticates, tagemail);

// 📤 Shared Tasks
router.get("/task/share/:workspaceId", authenticates, getShared);
router.post("/task/sharetodo/:workspaceId",authenticates,sharetodo )
router.post("/task/share/:workspaceId", authenticates, postShared);
router.delete("/task/share/:id", authenticates, deleteShared);

// 🧠 History & CSV
router.get("/task/history/:workspaceId", authenticates, HistoryController);
router.post("/task/history/delete", authenticates, DeleteHistory);
router.post("/task/csvdata", authenticates, createCsv);

// ✅ Bulk Actions
router.post("/task/bulkcomplete", authenticates, bulkCompleteTodos);
router.post("/task/bulkdelete", authenticates, bulkDeleteTodos);

// 📌 Important & Archived
router.post("/task/importantupdate/:id", authenticates, importantupdate);
router.put("/task/archieved/:id", authenticates, archieved);

// 🧠 Workspace
router.post("/task/createworkspace", authenticates, createworspace);
router.get("/getworkspace", authenticates, getworspace);
router.delete("/deleteworkspace/:workspaceId", authenticates, deleteworkspace);

// 👥 Invites & Roles
router.post("/inviteruser", authenticates, inviteUser);
router.get("/invitesUserole/:receiverId", authenticates, inviterRole);
router.post("/task/createdinvited/:id", authenticates, createInvited);
router.get("/task/createdinvited/:id", authenticates, getInvited);

// 📝 Comments
router.get("/task/allcomment/:taskId", authenticates, showallcomment);
router.post("/task/comment/:id", authenticates, createComment);
router.put("/task/comment/:editingId", authenticates, updateComment);
router.delete("/task/comment/:id", authenticates, deletecomment);

// 📋 Checklist (Work View)
router.get("/task/getworkchecklistdata/:id", authenticates, getworkChecklistdata);
router.put("/task/workupdate/checklist/:id", authenticates, updateChecklist);
router.delete("/task/workupdate/checklist/:id", authenticates, deleteChecklist);

// 📋 Checklist (Todos)
router.get("/todos/:todoId/checklist", authenticates, getChecklistItems);
router.post("/todos/:todoId/checklist", authenticates, createChecklistItem);
router.put("/checklist/:id", authenticates, updateChecklistItem);
router.delete("/checklist/:id", authenticates, deleteChecklistItem);

// 🧠 Work Data
router.get("/task/workdata/:id", authenticates, workdata);
router.put("/task/workupdate/:id", authenticates, workupdate);
router.delete("/task/workdelete/:id", authenticates, workdelete);

// ✅ Todos (Workspace Scoped)
router.get('/task/:workspaceId', authenticates, getTodos);
router.post('/task/:workspaceId', authenticates, createTodo);
router.put('/task/:id/:workspaceId', authenticates, updateTodo);
router.delete('/task/:id/:workspaceId', authenticates, deleteTodo);
router.post("/task/sharetodo", authenticates, sharetodo);

// 🧾 Single Todo (Generic Route — MUST BE LAST)
router.get("/task/:id", authenticates, getTodoById);

export default router;
