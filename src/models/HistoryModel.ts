import mongoose,{Schema,Document} from "mongoose";
import { IWorkspace } from "./WorkSpaceModel";

export interface HistoryData extends Document{
    userId:string,
    taskId:string,
    taskname:string,
    action:string,
    details:object,
    workspaceId?:IWorkspace|mongoose.Schema.Types.ObjectId,
    
}


const HistoryScehma:Schema<HistoryData>=new Schema<HistoryData>({
         userId:{
            type:String,
            required:true
         },
         taskId:{
            type:String,
            required:true
         },
         taskname:{
            type:String,
            required:true
         },
         action:{
            type:String,
            enum:["CREATE","UPDATE","DELETE","SHARE"],
            required:true
         },
         details:{
            type:Object,
            required:true,
         },
          workspaceId:{
       type:Schema.Types.ObjectId,
       ref:'workspace'
    }
        },{timestamps:true});

        const History:mongoose.Model<HistoryData>= mongoose.model<HistoryData>("History",HistoryScehma);
        export default History;
