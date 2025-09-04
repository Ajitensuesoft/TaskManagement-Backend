import mongoose, { Schema, Document } from "mongoose";

export interface INotification extends Document {
  from: string;
  message: string;
  to:string;
  taskId:string;
  userId:string;
  workspaceId?:string;
}

const notificationSchema = new Schema<INotification>(
  {
    from: { type: String, required: true },
    message: { type: String, required: true },
    to: { type: String, required: true },
      taskId: { type: String, required: true },
      userId:{type:String,required:true},
      workspaceId:{type:String},
  },
  { timestamps: true } // So you know when it was sent
);

export default mongoose.model<INotification>("Notification", notificationSchema);
