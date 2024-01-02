// User.ts
import type { User } from 'firebase/auth';
import mongoose, { Model } from 'mongoose';

export interface IUser {
	firebaseUid: User['uid'];
}
export interface IUserDocument extends IUser, Document {}

const userSchema = new mongoose.Schema<IUserDocument>({
	firebaseUid: {
		type: String,
		required: true,
		unique: true
	}
});

export const UserModel =
	(mongoose.models.User as Model<IUserDocument>) ||
	mongoose.model<IUserDocument>('User', userSchema);
