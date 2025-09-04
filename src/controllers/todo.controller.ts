// import { Request, Response } from "express";
// import Todo from "../models/todo.model";
// import { sendEmail } from "../utils/mailer";
// import User from '../models/usermodel';
// import History from "../models/HistoryModel";
// // GET all todos for logged-in user
// export const getTodos = async (req: any, res: Response) => {
//   try {
//     console.log("userId",req.userId);
    
//     const userId = (req as any).userId;
//     console.log("userid",userId)
//     const todos = await Todo.find({ userId });
//     res.json(todos);
//   } catch (err) {
//     console.error("Error fetching todos:", err);
//     res.status(500).json({ message: "Failed to fetch todos" });
//   }
// };

// // CREATE new todo
// export const createTodo = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).userId;
//     console.log("userId", userId);
//     const { title, description, status,priority,duedate} = req.body;
// console.log(title,description,status,priority,duedate);
//     if (!title) {
//       return res.status(400).json({ message: "Title is required" });
//     }

//     const newTodo = await Todo.create({
//       userId,
//       title,
//       description,
//       priority,
//       duedate,
//       status: status || "pending", // default to pending if not provided
//     });
//     console.log("newTodo", newTodo);

//     const Hist=await History.create({
//       userId:userId,
//       taskId:newTodo._id,
//       taskname:newTodo.title,
//       action:"CREATE",
//       duedate:newTodo.duedate,
//       details:{after:newTodo}
//     })
//     console.log("history of create",Hist);
//     res.status(201).json(newTodo);
//   } catch (err) {
//     console.error("Error creating todo:", err);
//     res.status(500).json({ message: "Failed to create todo" });
//   }
// };

// // UPDATE a todo
// export const updateTodo = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).userId;
//     const { id } = req.params;
//     const { title, description, status,priority } = req.body;
//     const olddata=await Todo.findOne({ _id: id, userId });

//     const updated = await Todo.findOneAndUpdate(
//       { _id: id, userId },
//       { title, description, status ,priority},
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Todo not found" });
//     }

//     res.json(updated);

// const Hist=await History.create({
//       userId:userId,
//       taskId:updated._id,
//       taskname:updated.title,
//       action:"UPDATE",
//       details:{old:olddata,after:updated}
//     })
//     console.log("history of updated",Hist);


//   } catch (err) {
//     console.error("Error updating todo:", err);
//     res.status(500).json({ message: "Failed to update todo" });
//   }
// };

// // DELETE a todo
// export const deleteTodo = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).userId;
//     const { id } = req.params;
//  const olddata=await Todo.findOne({ _id: id, userId });
//     const deleted = await Todo.findOneAndDelete({ _id: id, userId });

//     if (!deleted) {
//       return res.status(404).json({ message: "Todo not found" });
//     }

//     const Hist=await History.create({
//       userId:userId,
//       taskId:deleted._id,
//       taskname:deleted.title,
//       action:"DELETE",
//       details:{before:olddata}
//     })
//     console.log("history of updated",Hist);

//     res.status(204).send();
//   } catch (err) {
//     console.error("Error deleting todo:", err);
//     res.status(500).json({ message: "Failed to delete todo" });
//   }
// };



// export const sharetodo=async (req: Request, res: Response) => {
//   const { taskId, email } = req.body;
//   const userId = (req as any).userId;

//   if (!taskId || !email) {
//     return res.status(400).json({ message: "Task ID and email required" });
//   }

//   const task = await Todo.findOne({ _id: taskId, userId });
//   if (!task) return res.status(404).json({ message: "Task not found" });

//   try {
//    let data= await sendEmail(email, `Task Shared`, `Title: ${task.title}\nDescription: ${task.description}`);
//    console.log("recieved sender",data);
// const Hist=await History.create({
//       userId:userId,
//       taskId:task._id,
//       taskname:task.title,
//       action:"SHARE",
//       details:{sharedwith:email}
//     })
//     console.log("history of updated",Hist);

//     res.json({ success: true, message: "Task shared successfully",data:data });
//   } catch (err: any) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Failed to send email" });
//   }
// };




// export const allmail = async (req: Request, res: Response) => {
//   try {
//     // const docs = await User.find();
//     // console.log("All docs in Todo collection:", docs);

//     const mails = await User.find().distinct("email");
//     console.log("Distinct emails:", mails);

//     return res.status(200).json(mails);
//   } catch (err) {
//     console.error("Error fetching emails:", err);
//     return res.status(500).json({ message: "Failed to load all emails" });
//   }
// };





// export const bulkDeleteTodos = async (req: Request, res: Response) => {
//   try {
//     const { ids } = req.body; // array of todo _id
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({ message: "No task IDs provided" });
//     }

//     await Todo.deleteMany({ _id: { $in: ids } });
//     res.json({ success: true, message: "Tasks deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Failed to delete tasks" });
//   }
// };

// export const bulkCompleteTodos = async (req: Request, res: Response) => {
//   try {
//     const { ids } = req.body; // array of todo _id
//     if (!ids || !Array.isArray(ids) || ids.length === 0) {
//       return res.status(400).json({ message: "No task IDs provided" });
//     }

//     await Todo.updateMany({ _id: { $in: ids } }, { status: "Completed" });
//     res.json({ success: true, message: "Tasks marked as complete" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Failed to update tasks" });
//   }
// };




// export const HistoryController = async (req: Request, res: Response) => {
//   try {
//     const userId = (req as any).userId;
//     const history = await History.find({ userId });
//     res.json(history);
//   } catch (err) {
//     console.error("Error fetching history:", err);
//     res.status(500).json({ message: "Failed to fetch history" });
//   }
// };


// export const DeleteHistory=async(req:Request,res:Response)=>{

//   try{
//       let {id}=req.params;
//        let userId=(req as any).userId;
//        let deleted=await History.findByIdAndDelete({_id:id,userId});
//        if(!deleted){
//         return res.status(404).json({message:"History not found"});
//        }
//        res.status(204).json({
//         message:"History deleted successfully"
//        });
//   }
//   catch(err){
// console.error("some error:", err);
//     res.status(500).json({ message: "internal server errror" });
//   }
// }




// export const createCsv=async(req:Request,res:Response)=>{
//  let userId=(req as any).userId;
//  console.log("userId",userId);
//  try{
//   let parsedata=req.body;
//   console.log("parse data in backend",parsedata);
// console.log("csv data in backend",parsedata,userId);


// let finaldata=await Todo.insertMany(
//   parsedata?.map((d: any) => ({
//     userId,
//     title: d.title,
//     description: d.description,
//     priority: d.priority,
//     status: d.status,
//   }))
// );
// console.log("all csv data",finaldata);

// return res.status(200).json({
//   message:"data got successfully",
//   parsedata:parsedata,
// })

//  }
//  catch(err){
// console.log("error in csv",err);
//  res.status(500).json({ message: "internal server errror" });
//  }
// }






// src/controllers/todoController.ts

import { Request, Response } from "express";
import Todo from "../models/todo.model";
import { sendEmail } from "../utils/mailer";
import User from '../models/usermodel'; // Assuming 'usermodel' is your user model file
import History from "../models/HistoryModel";
import Checklist from "../models/checklist.model";
// Import the configured webpush instance and the sendNotification utility
import { sendNotification } from './webpushController'; // Adjust path if necessary
import Invites from "../models/InviteModel";
import UserTo from "../models/usermodel";
import Workspace from "../models/WorkSpaceModel";
// Helper function to send notification (to avoid repetition)
const sendPushNotification = async (userId: string, title: string, body: string) => {
  try {
    const user = await User.findById(userId);
    if (user && user.subscription) {
      const payload = JSON.stringify({ title, body });
      await sendNotification(user.subscription, payload);
      console.log(`Push notification sent to user ${userId} for: ${title}`);
    } else {
      console.log(`User ${userId} has no active subscription or user not found.`);
    }
  } catch (notificationError) {
    console.error(`Error sending push notification to user ${userId}:`, notificationError);
    // Continue execution, don't block the main API response
  }
};


// GET all todos for logged-in user
export const getTodos = async (req: any, res: Response) => {
  let workspaceId=req.params.workspaceId;
  console.log("workspaceId",workspaceId);
  try {
    console.log("userId", req.userId);

    const userId = (req as any).userId;
    console.log("userid", userId)
    const todos = await Todo.find({ workspaceId });
    console.log("todos",todos);
    res.json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

// CREATE new todo
export const createTodo = async (req: Request, res: Response) => {
  const alldata=req.body;
  console.log("alldata",alldata);
  try {
    let workspaceId=(req as any).params.workspaceId ;                                 //1change and schema change start from here
    console.log("workspaceId",workspaceId);
    const userId = (req as any).userId;
    console.log("userId", userId);
    const { title, description, status, priority, duedate,customFields } = req.body;
    console.log(title, description, status, priority, duedate,customFields);
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = await Todo.create({
      workspaceId:workspaceId,
      userId,
      title,
      description,
      priority,
      duedate,
      status: status || "pending", // default to pending if not provided
       customFields,
    });
    console.log("newTodo", newTodo);

    const Hist = await History.create({
      workspaceId:workspaceId,
      userId: userId,
      taskId: newTodo._id,
      taskname: newTodo.title,
      action: "CREATE",
      duedate: newTodo.duedate,
      details: { after: newTodo }
    })
    console.log("history of create", Hist);

    // Send push notification for new todo
    await sendPushNotification(
      userId,
      'New Task Created!',
      `Title: ${newTodo.title}`
    );

    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).json({ message: "Failed to create todo" });
  }
};

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



export const updateTodo = async (req: Request, res: Response) => {
  let alldataofupdate = req.body;
  console.log("alldataofupdate", alldataofupdate);
  let workspaceId = (req as any).params.workspaceId;

  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    
   
    const olddata = await Todo.findOne({ _id: id, workspaceId });
    if (!olddata) {
      return res.status(404).json({ message: "Todo not found" });
    }
    
   
    const updated = await Todo.findOneAndUpdate(
      { _id: id, workspaceId },
      req.body, 
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Todo not found after update" });
    }

   
    await sendPushNotification(
      userId,
      'Task Updated!',
      `Title: ${updated.title} Status: ${updated.status}`
    );

    res.json(updated);

    // Record the history with the old and new data, including customFields
    const Hist = await History.create({
      workspaceId: workspaceId,
      userId: userId,
      taskId: updated._id,
      taskname: updated.title,
      action: "UPDATE",
      details: { old: olddata, after: updated }
    });
    console.log("history of updated", Hist);

  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ message: "Failed to update todo" });
  }
};

// DELETE a todo
export const deleteTodo = async (req: Request, res: Response) => {
   let workspaceId=(req as any).params.workspaceId ;    
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const olddata = await Todo.findOne({ _id: id, workspaceId });
    const deleted = await Todo.findOneAndDelete({ _id: id, workspaceId });           //here both place i change userid to workspaceid

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const Hist = await History.create({
       workspaceId:workspaceId,    
      userId: userId,
      taskId: deleted._id,
      taskname: deleted.title,
      action: "DELETE",
      details: { before: olddata }
    })
    console.log("history of updated", Hist);

    // Send push notification for deleted todo
    await sendPushNotification(
      userId,
      'Task Deleted!',
      `Title: ${deleted.title} was removed.`
    );

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ message: "Failed to delete todo" });
  }
};



export const sharetodo = async (req: Request, res: Response) => {
   let workspaceId=(req as any).params.workspaceId ;                 //here i changed something
  const { taskId, email } = req.body;
  const userId = (req as any).userId;

  if (!taskId || !email) {
    return res.status(400).json({ message: "Task ID and email required" });
  }

  const task = await Todo.findOne({ _id: taskId, userId });
  if (!task) return res.status(404).json({ message: "Task not found" });

  try {
    let data = await sendEmail(email, `Task Shared`, `Title: ${task.title}\nDescription: ${task.description}`);
    console.log("recieved sender", data);
    const Hist = await History.create({
        workspaceId:workspaceId,
      userId: userId,
      taskId: task._id,
      taskname: task.title,
      action: "SHARE",
      details: { sharedwith: email }
    })
    console.log("history of updated", Hist);

    // Send push notification to the sharing user
    await sendPushNotification(
      userId,
      'Task Shared!',
      `You shared "${task.title}" with ${email}.`
    );

    res.json({ success: true, message: "Task shared successfully", data: data });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
};




export const allmail = async (req: Request, res: Response) => {
  try {
    // const docs = await User.find();
    // console.log("All docs in Todo collection:", docs);

    const mails = await User.find().distinct("email");
    console.log("Distinct emails:", mails);

    return res.status(200).json(mails);
  } catch (err) {
    console.error("Error fetching emails:", err);
    return res.status(500).json({ message: "Failed to load all emails" });
  }
};





export const bulkDeleteTodos = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body; // array of todo _id
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No task IDs provided" });
    }

    // Get the userId from the request (assuming middleware sets it)
    const userId = (req as any).userId;
    const deletedTodos = await Todo.find({ _id: { $in: ids }, userId }); // Find the todos to get their titles for notifications

    await Todo.deleteMany({ _id: { $in: ids }, userId });

    // Send individual notifications for bulk delete
    for (const todo of deletedTodos) {
      await sendPushNotification(
        userId,
        'Task Deleted (Bulk Action)!',
        `Title: ${todo.title} was removed.`
      );
    }

    res.json({ success: true, message: "Tasks deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to delete tasks" });
  }
};

export const bulkCompleteTodos = async (req: Request, res: Response) => {
  try {
    const { ids } = req.body; // array of todo _id
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ message: "No task IDs provided" });
    }

    // Get the userId from the request (assuming middleware sets it)
    const userId = (req as any).userId;
    const completedTodos = await Todo.find({ _id: { $in: ids }, userId }); // Find the todos to get their titles for notifications

    await Todo.updateMany({ _id: { $in: ids }, userId }, { status: "Completed" });
    
    // Send individual notifications for bulk complete
    for (const todo of completedTodos) {
      await sendPushNotification(
        userId,
        'Task Completed (Bulk Action)!',
        `Title: ${todo.title} is now completed.`
      );
    }

    res.json({ success: true, message: "Tasks marked as complete" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update tasks" });
  }
};




export const HistoryController = async (req: Request, res: Response) => {
  let workspaceId: any = req.params.workspaceId;
  console.log(workspaceId);
  try {
    const userId = (req as any).userId;
    console.log(userId);
    const history = await History.find({ workspaceId });
    res.json(history);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};


export const DeleteHistory = async (req: Request, res: Response) => {

  try {
    let { id } = req.params;
    let userId = (req as any).userId;
    let deleted = await History.findByIdAndDelete({ _id: id, userId });
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
}




export const createCsv = async (req: Request, res: Response) => {
  let userId = (req as any).userId;
  console.log("userId", userId);
  try {
    let parsedata = req.body;
    console.log("parse data in backend", parsedata);
    console.log("csv data in backend", parsedata, userId);


    let finaldata = await Todo.insertMany(
      parsedata?.map((d: any) => ({
        userId,
        title: d.title,
        description: d.description,
        priority: d.priority,
        status: d.status,
      }))
    );
    console.log("all csv data", finaldata);

    // Send push notification for CSV import
    await sendPushNotification(
      userId,
      'Tasks Imported!',
      `You imported ${finaldata.length} tasks from a CSV file.`
    );


    return res.status(200).json({
      message: "data got successfully",
      parsedata: parsedata,
    })

  }
  catch (err) {
    console.log("error in csv", err);
    res.status(500).json({ message: "internal server errror" });
  }
}




export const importantupdate=async(req:Request,res:Response)=>{
         let {id}=req.params;
         console.log("id is",id);
         let {isImprtant}=req.body;
         console.log('data of important',isImprtant);
         let userId=(req as any).userId;
         try{

           let updatedata=await Todo.findOneAndUpdate({ _id: id, userId },{important:isImprtant}, { new: true });
           res.status(200).json({
            message:"data got successfully",
            updatedata:updatedata,
           })
           console.log("updated data",updatedata);
         }catch(err){
          console.log("error in csv",err);
          res.status(500).json({ message: "internal server errror" });
         }
}



export const archieved=async(req:Request,res:Response)=>{

  let {id}=req.params;
  let userId=(req as any).userId;
  let {data}=req.body;
  console.log("backedn archieved data",data,userId,id)
  try{
    let updatedata=await Todo.findOneAndUpdate({ _id: id, userId }, {archieved:data}, { new: true });
    console.log("archievedupdated data",updatedata);
    return res.status(200).json({
     message:"data got successfully",
     updatedata:updatedata,
    })
    console.log("updated data",updatedata);
  }catch(err){
   console.log("error in csv",err);
return   res.status(500).json({ message: "internal server errror" });
  }
}





//for work notification write api to fetch data


export const workdata=async(req:Request,res:Response)=>{
  
let {id}=req.params;
 const {userId:userId} = req.query;
console.log("fakeuserid",userId);
//  let userId=(req as any).userId;

// const userId=id;
console.log("userid of work",id);
  try{
    let data=await Todo.find({_id:id,userId});
    console.log("work data",data);
    return res.status(200).json({
      message:"data got successfully",
      data:data,
     })
  }
  catch(err){
    console.log("err",err);
    return res.status(500).json("message internal server error");
  }
}



export const workupdate=async(req:Request,res:Response)=>{

   try {
    // const userId = (req as any).userId;
    const { id } = req.params;
    console.log("id of task",id);
    const { title, description, status, priority,userId } = req.body;
    console.log("userid",userId);
    // const olddata = await Todo.findOne({ _id: id, userId });
console.log("updated work data",title,description,status,priority,userId,id);


const singledata=await Todo.findOne({ _id: id, userId });
console.log("singledata of updatework",singledata);
    const updated = await Todo.findOneAndUpdate(
      { _id: id, userId },
      { title, description, status, priority },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({
      message:"data got updated successfully",
      updated:updated
    })
  }catch(err){
    return res.status(500).json({
      message:"internal server error",
    })
  }
}




export const workdelete=async(req:Request,res:Response)=>{

  let {id}=req.params;
  let {userId:userId}=req.query;
  console.log("userId",userId);
  try{
    let data=await Todo.deleteOne({_id:id,userId});
    console.log("work data",data);
    return res.status(200).json({
      message:"data got successfully",
      data:data,
     })
  }
  catch(err){
    console.log("err",err);
    return res.status(500).json("message internal server error");
  }
}







//get checklist data


export const getworkChecklistdata=async(req:Request,res:Response)=>{

  let {id}=req.params;
  const {userId:userId} = req.query;
  console.log("fakeuserid",userId);
  //  let userId=(req as any).userId;
  
  // const userId=id;
  console.log("todo id of work",id);
    try{
      let data=await Checklist.find({todo:id});
      console.log("work data",data);
      return res.status(200).json({
        message:"data got successfully",
        data:data,
       })
    }
    catch(err){
      console.log("err",err);
      return res.status(500).json("message internal server error");
    }
}







export const updateChecklist = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const updatedChecklist = await Checklist.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedChecklist) {
      return res.status(404).json({ message: "Checklist item not found" });
    }
    res.status(200).json({ message: "Checklist updated", data: updatedChecklist });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a checklist item
export const deleteChecklist = async (req:Request, res:Response) => {
  try {
    const { id } = req.params;
    const deletedChecklist = await Checklist.findByIdAndDelete(id);
    if (!deletedChecklist) {
      return res.status(404).json({ message: "Checklist item not found" });
    }
    res.status(200).json({ message: "Checklist deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};




export const inviterRole=async(req:Request,res:Response)=>{
             let receiverId=req.params.receiverId;

   try{

    let userfind=await Invites.find({receiverId:receiverId});
    console.log("userfind",userfind);
    return res.status(200).json({
      message:"data got successfully",
      data:userfind,
     })
   }
   catch(err){
 res.status(500).json({ message: "Server error" });
   }
}




export const tagemail=async(req:any,res:Response)=>{

            let value=req.query.value;
            console.log("value",value);

            try{
                   if(value=='@'){
                    let fetchgmail=await UserTo.find();
                    console.log("all fetchgmail",fetchgmail);
                    return res.status(200).json({
                    message:"all mail got",
                    data:fetchgmail,
                   })
                   }
                else{
                  return res.status(404).json({
                    message:"no any mail exist"
                  })
                }
            }
            catch(err){
return res.status(500).json({
                    message:"internal error exist"
                  })
            }
}



//analytic dashboard

export const allWorkspaceStatus = async (req: Request, res: Response) => {
  const workspaceId  = req.params.workspaceId;
  console.log("workspaceId", workspaceId);

  try {
    // get all todos
    const todos = await Todo.find({ workspaceId:workspaceId });
console.log("todos of workspace",todos);
    // get workspace details (with members)
    const workspace = await Workspace.findById({_id:workspaceId});
    console.log("allworkspaceData",workspace);
      // .populate("members", "name email");

    return res.status(200).json({
      message: "Data fetched successfully",
      workspace,  // 👈 full workspace details
      todos       // 👈 todos for that workspace
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal error occurred"
    });
  }
};