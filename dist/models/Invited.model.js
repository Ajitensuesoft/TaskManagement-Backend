"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const InvitedSchema = new mongoose_1.Schema({
    inviterId: { type: String, required: true },
    invitedId: { type: String, required: true },
    UserId: { type: String, required: true },
    taskId: { type: String, required: true },
});
const Invited = (0, mongoose_1.model)("Invited", InvitedSchema);
exports.default = Invited;
