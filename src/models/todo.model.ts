import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description?: string;
  status?: string; // no enum restriction
  userId: string;
  priority:string
  default:string
}

const todoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
     enum:["Pending","Completed","InProgress"],
     default :"InProgress"
    },
    userId: {
      type: String,
      required: true,
    },
    priority:{
      type:String,
       enum:["Low","Medium","Hard"],
       default:"Medium"
    }
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>("Todo", todoSchema);
