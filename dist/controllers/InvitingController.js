"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.acceptInvitation = exports.inviteUser = void 0;
const InviteModel_1 = __importDefault(require("../models/InviteModel"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
const mailer_1 = require("../utils/mailer");
const uuid_1 = require("uuid");
const WorkSpaceModel_1 = __importDefault(require("../models/WorkSpaceModel"));
const inviteUser = async (req, res) => {
    const token = (0, uuid_1.v4)();
    const userId = req.userId;
    const { workspaceId, email, role } = req.body;
    try {
        const userFind = await usermodel_1.default.findOne({ email });
        if (!userFind) {
            return res.status(404).json({ message: 'User not found with this email' });
        }
        const invite = new InviteModel_1.default({
            email: email,
            senderId: userId,
            receiverId: userFind._id,
            workspaceId,
            status: 'pending',
            role: role,
            token
        });
        const inviteLink = `http://localhost:5173/invite/accept/${token}`;
        await (0, mailer_1.sendEmail)(email, 'Invite to join workspace', `You've been invited by ${userId}. Accept here: ${inviteLink}`);
        const savedInvite = await invite.save();
        console.log("savedInvite", savedInvite);
        return res.status(200).json({
            message: 'Invite sent successfully',
            data: savedInvite
        });
    }
    catch (err) {
        console.error('Invite error:', err);
        return res.status(500).json({
            message: 'Internal server error',
            error: err
        });
    }
};
exports.inviteUser = inviteUser;
const acceptInvitation = async (req, res) => {
    try {
        const { invitationToken } = req.params;
        console.log("invitationTokne", invitationToken);
        let token = invitationToken;
        console.log("token", token);
        const inviteToken = await InviteModel_1.default.findOne({
            token,
            isUsed: false
        });
        console.log("inviteToken", inviteToken);
        if (!inviteToken) {
            res.status(400).json({ message: 'Invalid or expired invitation token' });
            return;
        }
        const user = await usermodel_1.default.findOne({ email: inviteToken.email });
        if (!user) {
            res.status(400).json({ message: 'User not found. Please register first.' });
            return;
        }
        // Add user to workspace
        const workspace = await WorkSpaceModel_1.default.findById(inviteToken.workspaceId);
        if (!workspace) {
            res.status(404).json({ message: 'Workspace not found' });
            return;
        }
        const existingMember = workspace.members.find(m => m.userId.toString() === String(user._id));
        if (existingMember) {
            res.status(400).json({ message: 'User is already a member of this workspace' });
            return;
        }
        const member = workspace.members.push({
            userId: user._id,
            role: inviteToken.role,
            joinedAt: new Date()
        });
        console.log("member", member);
        await workspace.save();
        // Mark invitation as used
        inviteToken.isUsed = true;
        await inviteToken.save();
        res.json({
            success: true,
            message: 'Invitation accepted successfully'
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
exports.acceptInvitation = acceptInvitation;
