import { Request, Response } from "express";
import Todo from "../models/todo.model";
import { sendEmail } from "../utils/mailer";
import User from '../models/usermodel';
import History from "../models/HistoryModel";
// GET all todos for logged-in user
export const getTodos = async (req: any, res: Response) => {
  try {
    console.log("userId",req.userId);
    
    const userId = (req as any).userId;
    console.log("userid",userId)
    const todos = await Todo.find({ userId });
    res.json(todos);
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ message: "Failed to fetch todos" });
  }
};

// CREATE new todo
export const createTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    console.log("userId", userId);
    const { title, description, status,priority } = req.body;
console.log(title,description,status,priority);
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const newTodo = await Todo.create({
      userId,
      title,
      description,
      priority,
      status: status || "pending", // default to pending if not provided
    });
    console.log("newTodo", newTodo);

    const Hist=await History.create({
      userId:userId,
      taskId:newTodo._id,
      taskname:newTodo.title,
      action:"CREATE",
      details:{after:newTodo}
    })
    console.log("history of create",Hist);
    res.status(201).json(newTodo);
  } catch (err) {
    console.error("Error creating todo:", err);
    res.status(500).json({ message: "Failed to create todo" });
  }
};

// UPDATE a todo
export const updateTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
    const { title, description, status,priority } = req.body;
    const olddata=await Todo.findOne({ _id: id, userId });

    const updated = await Todo.findOneAndUpdate(
      { _id: id, userId },
      { title, description, status ,priority},
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json(updated);

const Hist=await History.create({
      userId:userId,
      taskId:updated._id,
      taskname:updated.title,
      action:"UPDATE",
      details:{old:olddata,after:updated}
    })
    console.log("history of updated",Hist);


  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ message: "Failed to update todo" });
  }
};

// DELETE a todo
export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const { id } = req.params;
 const olddata=await Todo.findOne({ _id: id, userId });
    const deleted = await Todo.findOneAndDelete({ _id: id, userId });

    if (!deleted) {
      return res.status(404).json({ message: "Todo not found" });
    }

    const Hist=await History.create({
      userId:userId,
      taskId:deleted._id,
      taskname:deleted.title,
      action:"DELETE",
      details:{before:olddata}
    })
    console.log("history of updated",Hist);

    res.status(204).send();
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ message: "Failed to delete todo" });
  }
};



export const sharetodo=async (req: Request, res: Response) => {
  const { taskId, email } = req.body;
  const userId = (req as any).userId;

  if (!taskId || !email) {
    return res.status(400).json({ message: "Task ID and email required" });
  }

  const task = await Todo.findOne({ _id: taskId, userId });
  if (!task) return res.status(404).json({ message: "Task not found" });

  try {
   let data= await sendEmail(email, `Task Shared`, `Title: ${task.title}\nDescription: ${task.description}`);
   console.log("recieved sender",data);
const Hist=await History.create({
      userId:userId,
      taskId:task._id,
      taskname:task.title,
      action:"SHARE",
      details:{sharedwith:email}
    })
    console.log("history of updated",Hist);

    res.json({ success: true, message: "Task shared successfully",data:data });
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

    await Todo.deleteMany({ _id: { $in: ids } });
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

    await Todo.updateMany({ _id: { $in: ids } }, { status: "Completed" });
    res.json({ success: true, message: "Tasks marked as complete" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to update tasks" });
  }
};




export const HistoryController = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const history = await History.find({ userId });
    res.json(history);
  } catch (err) {
    console.error("Error fetching history:", err);
    res.status(500).json({ message: "Failed to fetch history" });
  }
};


export const DeleteHistory=async(req:Request,res:Response)=>{

  try{
      let {id}=req.params;
       let userId=(req as any).userId;
       let deleted=await History.findByIdAndDelete({_id:id,userId});
       if(!deleted){
        return res.status(404).json({message:"History not found"});
       }
       res.status(204).json({
        message:"History deleted successfully"
       });
  }
  catch(err){
console.error("some error:", err);
    res.status(500).json({ message: "internal server errror" });
  }
}




export const createCsv=async(req:Request,res:Response)=>{
 let userId=(req as any).userId;
 console.log("userId",userId);
 try{
  let parsedata=req.body;
  console.log("parse data in backend",parsedata);
console.log("csv data in backend",parsedata,userId);


let finaldata=await Todo.insertMany(
  parsedata?.map((d: any) => ({
    userId,
    title: d.title,
    description: d.description,
    priority: d.priority,
    status: d.status,
  }))
);
console.log("all csv data",finaldata);

return res.status(200).json({
  message:"data got successfully",
  parsedata:parsedata,
})

 }
 catch(err){
console.log("error in csv",err);
 res.status(500).json({ message: "internal server errror" });
 }
}

