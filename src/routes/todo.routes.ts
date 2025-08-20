import express from 'express';
// import { authenticate } from "@clerk/express";
import {
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  sharetodo,
  allmail,
  bulkCompleteTodos,
  bulkDeleteTodos,
  HistoryController,
  DeleteHistory,
  createCsv,
} from '../controllers/todo.controller';

import{
getShared,
postShared,
deleteShared,
getNotifications,
deleteNotification,
createNotification,
viewNotification
}from"../controllers/NoteController"
import { saveSubscription } from '../controllers/webpushController';
import { authenticates } from "../middleware/authenticate";
import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
const router = express.Router();
// import { saveSubscription, sendTestPush } from "../controllers/pushController";
import { attachUserId } from '../middleware/attachUserId';
router.get("/task/allmail",allmail);
// router.post("/subscribe", saveSubscription);
// router.post("/send-test", sendTestPush);

// router.get("/task/share",getShared);
// router.post("/task/share",postShared);
// router.delete("/task/share/:id",deleteShared);
router.post('/subscribe', saveSubscription);
router.get("/task/notifications",getNotifications);
router.delete("/task/notifications/:id",deleteNotification);
router.post("/task/notifications",createNotification);
// import { unifiedAuthenticate } from '../middleware/unifiedAuthenticate ';
// router.use(authenticates);
// console.log("attachuserid",attachUserId);

// router.get('/task',authenticate,attachUserId, getTodos);
// router.post('/task',authenticate, attachUserId,createTodo);
// router.put('/task/:id',authenticate, attachUserId,updateTodo);
// router.delete('/task/:id',authenticate, attachUserId,deleteTodo);
// // router.get('/task', unifiedAuthenticate, getTodos);
// router.post('/task', unifiedAuthenticate, createTodo);
// router.put('/task/:id', unifiedAuthenticate, updateTodo);
// router.delete('/task/:id', unifiedAuthenticate, deleteTodo);

router.get('/task',authenticates, getTodos);
router.post('/task',authenticates, createTodo);
router.put('/task/:id',authenticates,updateTodo);
router.delete('/task/:id',authenticates,deleteTodo);
router.post("/task/sharetodo",authenticates,sharetodo )
router.get("/task/allmail",allmail);

router.get("/task/share",authenticates,getShared);
router.post("/task/share",authenticates,postShared);
router.delete("/task/share/:id",authenticates,deleteShared);

router.get("/task/notifications",authenticates,getNotifications);
router.delete("/task/notifications/:id",authenticates,deleteNotification);
router.post("/task/notifications",authenticates,createNotification);

// router.get('/task',attachUserId, getTodos);
// router.post('/task',attachUserId, createTodo);
// router.put('/task/:id',attachUserId,updateTodo);
// router.delete('/task/:id',attachUserId,deleteTodo);


//bulk delete or complete

router.post("/task/bulkcomplete",authenticates,bulkCompleteTodos);
router.post("/task/bulkdelete",authenticates,bulkDeleteTodos);

// router.get("/task/viewnotification/:id",authenticates,viewNotification);
router.get("/task/viewnotification/:id", authenticates, viewNotification);


router.get("/task/history",authenticates,HistoryController);
router.post("/task/history/delete",authenticates,DeleteHistory);
router.post("/task/csvdata",authenticates,createCsv);
export default router;
