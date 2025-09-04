"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInvited = exports.createInvited = void 0;
const Invited_model_1 = __importDefault(require("../models/Invited.model"));
const createInvited = async (req, res) => {
    const { inviterId, invitedId, UserId, taskId } = req.body;
    console.log("creaetedinviteduserid", inviterId, invitedId, UserId, taskId);
    try {
        const Invite = await Invited_model_1.default.create({ inviterId, invitedId, UserId, taskId });
        console.log("Invite", Invite);
        return res.status(200).json({
            message: 'Invited created successfully',
            Invited: Invite,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'internal server error'
        });
    }
};
exports.createInvited = createInvited;
const getInvited = async (req, res) => {
    try {
        const Invite = await Invited_model_1.default.find();
        console.log("Invite", Invite);
        return res.status(200).json({
            message: 'Invited fetched successfully',
            Invited: Invite,
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'internal server error'
        });
    }
};
exports.getInvited = getInvited;
