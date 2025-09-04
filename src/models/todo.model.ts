import mongoose, { Schema, Document } from "mongoose";

import { IWorkspace } from "./WorkSpaceModel";

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
taskexpired?:boolean,
important:boolean,
archieved?:boolean,
workspaceId?:IWorkspace|mongoose.Schema.Types.ObjectId,
 customFields?: {
    id?: string;
    label?: string;
    type?: string;
    value?: any;
    options?: string[];
  }[];
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
    },
    important:{
      type:Boolean,
      default:false
    },
    archieved:{
      type:Boolean,
      default:false
    },
    workspaceId:{
       type:Schema.Types.ObjectId,
       ref:'Workspace'
    },
    customFields: {
  type: [
    {
      id: { type: String },
      label: { type: String },
      type: { type: String },
      value: { type: mongoose.Schema.Types.Mixed },
      options: [{ type: String }],
    }
  ],
  default: [],
}

  },

  { timestamps: true }
);

export default mongoose.model<ITodo>("Todo", todoSchema);
