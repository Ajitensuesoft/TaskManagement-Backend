import mongoose,{Schema,Document} from "mongoose";


export interface HistoryData extends Document{
    userId:string,
    taskId:string,
    taskname:string,
    action:string,
    details:object,
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
         }
        },{timestamps:true});

        const History:mongoose.Model<HistoryData>= mongoose.model<HistoryData>("History",HistoryScehma);
        export default History;
