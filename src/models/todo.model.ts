import mongoose, { Schema, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description?: string;
  status?: string; // no enum restriction
  userId: string;
  priority:string
  default:string;
  duedate:Date,
twohourremaindersent?:boolean,
onehourremaindersent?:boolean,
thirtyminuteremaindersent?:boolean,
taskexpired?:boolean
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
    },
    duedate:{
type:Date,
required:true,
    },
    twohourremaindersent:{
      type:Boolean,
      default:false,
    },
     onehourremaindersent:{
      type:Boolean,
      default:false,
    },
     thirtyminuteremaindersent:{
      type:Boolean,
      default:false,
    },
    taskexpired:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>("Todo", todoSchema);
