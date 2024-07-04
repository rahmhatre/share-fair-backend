import { Document, Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  name: string;
  email: string;
  authMode: string; // Replace with enum if available
  userType: string; // Replace with enum if available
  status: string; // Replace with enum if available
  password?: string;
  accessToken?: string;
  mobileNumber?: string;
  address?: string;
  postcode?: string;
  expoPushNotificationToken?: string;
  createdAt?: string;
  updatedAt?: string;
  comparePassword(password: string, callback: (error: Error, isMatch: boolean) => void): void;
}

const userSchema: Schema<IUser> = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    authMode: {
      required: true, // AuthMode Enum
      type: String,
    },
    userType: {
      required: true, // UserType Enum
      type: String,
    },
    status: {
      required: true, // UserStatus Enum
      type: String,
    },
    password: {
      required: false,
      type: String,
    },
    accessToken: {
      required: false,
      type: String,
    },
    mobileNumber: {
      required: false,
      type: String,
    },
    address: {
      required: false,
      type: String,
    },
    postcode: {
      required: false,
      type: String,
    },
    expoPushNotificationToken: {
      required: false,
      type: String,
    },
    createdAt: {
      required: false,
      type: String,
    },
    updatedAt: {
      required: false,
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre<IUser>('save', function (next) {
  const login = this;

  // If password is not entered which could be possible in Google Auth Flow
  // Skip the password hash method
  if (!login?.password) {
    return next();
  }

  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError);
      } else {
        bcrypt.hash(login.password as string, salt, function (hashError, hash) {
          if (hashError) {
            return next(hashError);
          }
          login.password = hash;
          next();
        });
      }
    });
  } else {
    return next();
  }
});

userSchema.methods.comparePassword = function (password: string, callback: (error: Error | null, isMatch?: boolean) => void) {
  bcrypt.compare(password, this.password as string, function (error, isMatch) {
    if (error) {
      return callback(error);
    } else {
      callback(null, isMatch);
    }
  });
};

const UserModel = model<IUser>('User', userSchema);

export default UserModel;
