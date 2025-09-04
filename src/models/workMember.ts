import mongoose, {Document,Schema} from 'mongoose';
export interface IworkMember extends Document{
    userId:mongoose.Schema.Types.ObjectId;
    workspaceId:mongoose.Schema.Types.ObjectId;
    role:string;
}


const WorkMemberSchema=new Schema<IworkMember>({
    userId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    workspaceId:{
        type: mongoose.Types.ObjectId,
        ref: 'Workspace',
        required: true,
    },
    role:{
        type:String,
        enum:['admin','member'],
        default:'member',
    }
},{timestamps:true});

const WorkMember=mongoose.model<IworkMember>('WorkMember',WorkMemberSchema);
export default WorkMember;