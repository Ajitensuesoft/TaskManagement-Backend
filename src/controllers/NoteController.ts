import {Request,Response} from "express"
import Sharedmodel from "../models/Sharedmodel"
import NotificationModel from "../models/NotificationModel"
import todoModel from "../models/todo.model";



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
export const getShared = async (req: Request, res: Response) => {
  try {
    const { email } = req.query; // email of the sender

    if (!email || typeof email !== "string") {
      return res.status(400).json({ message: "Sender email is required" });
    }

    // Find all shared tasks where 'from' matches the sender's email
    const shared = await Sharedmodel.find({ from: email }).sort({ createdAt: -1 });
    
    return res.status(200).json({
      data: shared,
    });
  } catch (err) {
    console.error("Error fetching shared tasks:", err);
    return res.status(500).json({
      message: "Server error",
    });
  }
};
export const postShared = async (req: Request, res: Response) => {
  try {
    const {from, to, title, taskId } = req.body;

    // get sender's email from Clerk or JWT auth
    // const senderEmail =  req.body.from; 
    // console.log("senderemail",senderEmail);

    // if (!senderEmail) {
    //   return res.status(400).json({ message: "Sender email is required" });
    // }

    const shared = await Sharedmodel.create({
      from,
      to,
      title,
      taskId
    });

    console.log("shared", shared);
    return res.status(201).json({ data: shared });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteShared = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // shared record _id

    const deleted = await Sharedmodel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Shared record not found" });
    }

    return res.status(200).json({ message: "Shared task removed successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};






export const createNotification = async (req: Request, res: Response) => {
  try {
    const { from, message,to,taskId } = req.body;
    console.log('getnotification',from ,message,to);

    if (!from || !message) {
      return res.status(400).json({ message: "From and message are required" });
    }

    const notification = await NotificationModel.create({ from, message,to,taskId });
console.log("notification",notification);
    return res.status(201).json({
      message: "Notification created successfully",
      data: notification,
    });
  } catch (error) {
    console.error("Error creating notification:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// export const getNotifications = async (req: Request, res: Response) => {
//   try {
//     const notifications = await NotificationModel.find().sort({ createdAt: -1 });

//     return res.status(200).json(notifications);
//   } catch (error) {
//     console.error("Error fetching notifications:", error);
//     return res.status(500).json({ message: "Server error" });
//   }
// };
export const getNotifications = async (req: Request, res: Response) => {
  try {
    const email = req.query.email as string; // receiver email
    console.log("email",email);
    if (!email) {
      return res.status(400).json({ message: "Receiver email is required" });
    }

    // Only get notifications for this receiver
    const notifications = await NotificationModel.find({ to: email });
console.log("notifications",notifications);
    res.status(200).json({ data: notifications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await NotificationModel.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Notification not found" });
    }

    return res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    console.error("Error deleting notification:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const viewNotification = async (req: Request, res: Response) => {
  const { id } = req.params; // from URL: /task/viewnotification/:id
  const userId = (req as any).userId; // from auth middleware

  console.log("taskId", id);
  console.log("userId", userId);

  try {
    // Search by both _id and userId
    const viewdata = await todoModel.findOne({
      _id:id,
     
    });
console.log("viewdata",viewdata);
    if (!viewdata) {
      return res.status(404).json({ message: "Notification does not exist" });
    }

    res.status(200).json(viewdata);
  } catch (err) {
    console.error("Error viewing notification:", err);
    res.status(500).json({ message: "Server error" });
  }
};
