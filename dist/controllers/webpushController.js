"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSubscription = exports.sendNotification = void 0;
const web_push_1 = __importDefault(require("web-push"));
const usermodel_1 = __importDefault(require("../models/usermodel"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Set VAPID details from environment variables
web_push_1.default.setVapidDetails('mailto:youremail@example.com', process.env.VAPID_PUBLIC_KEY, process.env.VAPID_PRIVATE_KEY);
const sendNotification = async (subscription, payload) => {
    try {
        await web_push_1.default.sendNotification(subscription, payload);
        console.log('Push notification sent successfully.');
    }
    catch (error) {
        if (error.statusCode === 410 || error.statusCode === 404) {
            console.log('Subscription expired or not found. Removing from database.');
            // In a real app, you would remove this subscription from the user model
        }
        else {
            console.error('Error sending push notification:', error);
        }
    }
};
exports.sendNotification = sendNotification;
const saveSubscription = async (req, res) => {
    try {
        const { userId, subscription } = req.body;
        await usermodel_1.default.findByIdAndUpdate(userId, { subscription });
        res.status(200).json({ message: 'Subscription saved.' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to save subscription.' });
    }
};
exports.saveSubscription = saveSubscription;
