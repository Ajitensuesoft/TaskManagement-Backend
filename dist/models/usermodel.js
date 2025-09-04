"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    //i add this for push notification
    subscription: {
        type: Object, // Mongoose will handle the nested structure
        required: false,
    },
    password_hash: {
        type: String,
        // Only required if role is 'local'
        required: [
            function () {
                return this.role === 'local';
            },
            'password_hash is required for local users',
        ],
    },
    clerkUserId: {
        type: String,
        required: false,
        validate: {
            validator: function (value) {
                console.log("validator", value);
                if (this.role === 'clerk' && !value) {
                    return false;
                }
                return true;
            },
            message: 'clerkUserId is required for Clerk users',
        },
        unique: true,
        sparse: true,
    },
    role: {
        type: String,
        enum: ['clerk', 'local'],
        required: true,
        default: 'local',
    },
    firstName: String,
    lastName: String,
    imageUrl: String,
}, {
    timestamps: true,
});
const UserTo = mongoose_1.default.model('UserTo', userSchema);
exports.default = UserTo;
