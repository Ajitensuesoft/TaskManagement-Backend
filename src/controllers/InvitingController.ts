import {Request,Response} from "express";
import * as mongoose from 'mongoose';
import Invites from "../models/InviteModel";
import Todo from "../models/todo.model";
import UserTo from "../models/usermodel";
import { sendEmail } from "../utils/mailer";
import { v4 as uuidv4 } from 'uuid';
import Workspace from "../models/WorkSpaceModel";

export const inviteUser = async (req: Request, res: Response) => {
  const token = uuidv4();
  const userId = (req as any).userId;
  const { workspaceId, email,role } = req.body;

  try {
    const userFind = await UserTo.findOne({ email });
    if (!userFind) {
      return res.status(404).json({ message: 'User not found with this email' });
    }

    const invite = new Invites({
        email:email,
      senderId: userId,
      receiverId: userFind._id,
      workspaceId,
      status: 'pending',
      role:role,
      token
    });

    const inviteLink = `http://localhost:5173/invite/accept/${token}`;
    await sendEmail(email, 'Invite to join workspace', `You've been invited by ${userId}. Accept here: ${inviteLink}`);

    const savedInvite = await invite.save();
console.log("savedInvite",savedInvite);
    return res.status(200).json({
      message: 'Invite sent successfully',
      data: savedInvite
    });
  } catch (err) {
    console.error('Invite error:', err);
    return res.status(500).json({
      message: 'Internal server error',
      error: err
    });
  }
};


export const acceptInvitation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { invitationToken } = req.params;
console.log("invitationTokne",invitationToken);
    let token=invitationToken;

console.log("token",token);
const inviteToken = await Invites.findOne({ 
  token,
  isUsed: false
});

console.log("inviteToken",inviteToken);
    if (!inviteToken) {
      res.status(400).json({ message: 'Invalid or expired invitation token' });
      return;
    }

    const user = await UserTo.findOne({ email: inviteToken.email });
    if (!user) {
      res.status(400).json({ message: 'User not found. Please register first.' });
      return;
    }

    // Add user to workspace
    const workspace = await Workspace.findById(inviteToken.workspaceId);
    if (!workspace) {
      res.status(404).json({ message: 'Workspace not found' });
      return;
    }
        const existingMember = workspace.members.find(m => m.userId.toString() === String(user._id));
    if (existingMember) {
      res.status(400).json({ message: 'User is already a member of this workspace' });
      return;
    }

  const member=  workspace.members.push({
    userId: user._id as mongoose.Types.ObjectId,
  role: inviteToken.role,
  joinedAt: new Date()
});
console.log("member",member);

    await workspace.save();

    // Mark invitation as used
    inviteToken.isUsed = true;

    await inviteToken.save();

    res.json({
      success: true,
      message: 'Invitation accepted successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: (error as Error).message });
  }
};