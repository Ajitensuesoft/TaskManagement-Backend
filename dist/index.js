"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const svix_1 = require("svix");
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
// import User from './models/user.model';
const usermodel_1 = __importDefault(require("./models/usermodel"));
const fetchClerkUser_1 = require("./utils/fetchClerkUser");
const todo_routes_1 = __importDefault(require("./routes/todo.routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
require("./taskRemainder");
const InvitingController_1 = require("./controllers/InvitingController");
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
// app.options('*', (req: Request, res: Response, next: NextFunction) => {
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })(req, res, next);
// });
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true
}));
app.get("/", (req, res) => {
    res.send("hello");
});
app.post('/invite/accept/:invitationToken', InvitingController_1.acceptInvitation);
// const vapidKeys = webpush.generateVAPIDKeys();
// console.log("vapidKeys",vapidKeys);
// app.post('/invite/accept/:token', acceptInvitation);
app.use((0, cookie_parser_1.default)());
// app.use(express.json());
// app.use(express.json());
// app.use(ClerkExpressWithAuth);
console.log("process.env.CLERK_WEBHOOK_SECRET_KEY", process.env.CLERK_WEBHOOK_SECRET_KEY);
app.post('/api/webhook', body_parser_1.default.raw({ type: 'application/json' }), async (req, res) => {
    try {
        const payloadString = req.body.toString();
        const svixHeaders = req.headers;
        const webhook = new svix_1.Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);
        console.log("webhook", webhook);
        const event = webhook.verify(payloadString, svixHeaders);
        console.log('📨 Webhook Event:', event);
        const { id } = event.data;
        const eventType = event.type;
        const fullUser = await (0, fetchClerkUser_1.fetchClerkUser)(id);
        console.log('👤 Clerk User:', JSON.stringify(fullUser, null, 2));
        const userData = {
            clerkUserId: fullUser.id,
            firstName: fullUser.first_name || '',
            lastName: fullUser.last_name || '',
            email: fullUser.email_addresses?.[0]?.email_address || '',
            imageUrl: fullUser.image_url || '',
            role: 'clerk',
        };
        console.log("userdata", userData);
        if (eventType === 'user.created' || eventType === 'user.updated') {
            await usermodel_1.default.findOneAndUpdate({ clerkUserId: fullUser.id }, userData, { upsert: true, new: true });
            console.log(` ${eventType} - User saved/updated`);
        }
        else if (eventType === 'user.deleted') {
            await usermodel_1.default.findOneAndDelete({ clerkUserId: fullUser.id });
            console.log(`${eventType} - User deleted`);
        }
        else {
            console.log(` Unhandled event type: ${eventType}`);
        }
        res.status(200).json({ success: true, message: `Processed ${eventType}` });
    }
    catch (err) {
        console.error(' Webhook error:', err.message);
        res.status(400).json({ success: false, message: err.message });
    }
});
app.use(express_1.default.json());
// app.post('/invite/accept/:token', acceptInvitation);
// app.use(ClerkExpressWithAuth); 
app.use("/api/v1", todo_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(` Server running on port ${PORT}`);
});
