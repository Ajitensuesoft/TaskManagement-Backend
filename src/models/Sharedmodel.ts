import mongoose, { Schema, Document } from "mongoose";
import { IWorkspace } from "./WorkSpaceModel";
export interface IShared extends Document {
  from: string;       // sender's email
  to: string;         // receiver's email
  title?: string;     // task title (optional if using taskId)
  taskId?: string;    // optional: link to Todo model
    workspaceId?:IWorkspace|mongoose.Schema.Types.ObjectId,
}

const sharedSchema = new Schema<IShared>(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    title: { type: String },  
    taskId: { type: String }, 
    workspaceId:{type:String},
  },
  { timestamps: true }
);

export default mongoose.model<IShared>("Shared", sharedSchema);
