import mongoose, { Schema, Document } from 'mongoose';


export interface IPushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}
export interface IUser extends Document {
  email: string;
  password_hash?: string;
  clerkUserId?: string;
  role: 'clerk' | 'local';
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  createdAt?: Date;
  updatedAt?: Date;
  subscription?: IPushSubscription;
}


const userSchema: Schema = new mongoose.Schema(
  {
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
        function (this: IUser) {
          return this.role === 'local';
        },
        'password_hash is required for local users',
      ],
    },

    clerkUserId: {
      type: String,
      required: false,
     
      validate: {
        validator: function (this: IUser, value: string) {
          console.log("validator",value);
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
  },
  
  {
    timestamps: true,
  }
);

const UserTo = mongoose.model<IUser>('UserTo', userSchema);

export default UserTo;






