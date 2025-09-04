import mongoose ,{Schema,Document, Mongoose} from "mongoose";


 interface Icheklist extends Document{
    todo:Schema.Types.ObjectId;
title:string;
status:string;

}

const checklist=new Schema<Icheklist>({
todo:{
type:Schema.Types.ObjectId,
ref:'Todo',
required:true,
},

    title:{
        type:String
    },
    status:{
        type:String,
        enum:["Pending","Completed","Low"]
    }
},{timestamps:true});

export default mongoose.model<Icheklist>("Checklist",checklist);
