import mongoose, { Document, Schema } from "mongoose";
export enum UserRole {
  ADMIN = 'admin',
  EDITOR = 'editor',
  VIEWER = 'viewer'
}
interface Iinvite{
    senderId: mongoose.Schema.Types.ObjectId;
      email: string;
    receiverId: mongoose.Schema.Types.ObjectId;
    workspaceId: mongoose.Schema.Types.ObjectId;
    status: string;
    token:string;  
      isUsed:boolean;
        role: UserRole;

}

const Invite=new Schema<Iinvite>({

    senderId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
    receiverId:{
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    workspaceId:{
        type: mongoose.Types.ObjectId,
        ref: 'Workspace',
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
    },
    token: {
        type: String,
        required: true,
    },
      isUsed: {
    type: Boolean,
    default: false
  },
   role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.VIEWER
  },


},{timestamps:true});

const Invites=mongoose.model<Iinvite>('Invites',Invite);
export default Invites;

