import mongoose, { Schema, Document } from "mongoose";

export interface IComment extends Document {
    taskId: string;
    userId: string;
    content?: string;
  
}


const commentSchema = new Schema<IComment>({
    taskId: { type: String, required: true },
    userId: { type: String, required: true },
    content: { type: String,  },
    
  },{timestamps:true});
  
  export default mongoose.model<IComment>("Comment", commentSchema);