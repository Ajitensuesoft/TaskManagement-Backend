import Mongoose ,{Schema,Document,model} from "mongoose";


export interface Invites extends Document {
    inviterId:string,
    invitedId:string,
    UserId:string,
    taskId:string,
}

const InvitedSchema:Schema<Invites> = new Schema<Invites>({
    inviterId:{type:String,required:true},
    invitedId:{type:String,required:true},
    UserId:{type:String,required:true},
    taskId:{type:String,required:true},
})



const Invited = model<Invites>("Invited",InvitedSchema);
export default Invited;