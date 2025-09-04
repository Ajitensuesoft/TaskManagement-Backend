import mongoose, { Schema, Document } from "mongoose";

export enum UserRole {
  ADMIN = "admin",
  EDITOR = "editor",
  VIEWER = "viewer",
}

export interface IWorkspaceMember {
  userId: mongoose.Types.ObjectId;
  role: UserRole;
  joinedAt: Date;
}

export interface IWorkspace extends Document {
  name: string;
  userId: mongoose.Types.ObjectId; 
  members: IWorkspaceMember[];
  createdAt: Date;
  updatedAt: Date;
}

const workspaceMemberSchema = new Schema<IWorkspaceMember>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.VIEWER,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: { type: String, required: true, trim: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, 
    members: [workspaceMemberSchema],
  },
  { timestamps: true }
);

workspaceSchema.pre("save", function (next) {
  if (this.isNew && this.members.length === 0) {
    this.members.push({
      userId: this.userId,
      role: UserRole.ADMIN,
      joinedAt: new Date(),
    });
  }
  next();
});

// Useful indexes
workspaceSchema.index({ userId: 1 });
workspaceSchema.index({ "members.userId": 1 });

const Workspace: mongoose.Model<IWorkspace> = mongoose.model<IWorkspace>(
  "Workspace",
  workspaceSchema
);

export default Workspace;  