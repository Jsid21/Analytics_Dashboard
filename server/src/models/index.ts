import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

export interface ITransaction extends Document {
  userId: mongoose.Types.ObjectId;
  amount: number;
  date: Date;
  description: string;
}

const TransactionSchema: Schema = new Schema({
  userId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  description: { type: String, required: true },
});

export const User = mongoose.model<IUser>('User', UserSchema);
export const Transaction = mongoose.model<ITransaction>('Transaction', TransactionSchema);