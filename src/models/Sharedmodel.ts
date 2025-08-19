import mongoose, { Schema, Document } from "mongoose";

export interface IShared extends Document {
  from: string;       // sender's email
  to: string;         // receiver's email
  title?: string;     // task title (optional if using taskId)
  taskId?: string;    // optional: link to Todo model
}

const sharedSchema = new Schema<IShared>(
  {
    from: { type: String, required: true },
    to: { type: String, required: true },
    title: { type: String },  
    taskId: { type: String }, 
  },
  { timestamps: true }
);

export default mongoose.model<IShared>("Shared", sharedSchema);
