import { Schema, model } from 'mongoose';

export interface IMemberAmount {
  memberId: string;
  amount: string;
}
const memberAmountSchema: Schema<IMemberAmount> = new Schema({
  amount: {
    required: true,
    type: String,
  },
  memberId: {
    required: true,
    type: String,
  },
});

export interface ITransaction {
  transactionName: string;
  totalAmount: string;
  memberAmounts: IMemberAmount[];
  transactionDescription?: string;
  categoryId?: string; // TODO: future development
  currencyId?: string; // TODO: future development
  notes?: string;
  tags?: string[];
  settlementTime?: string;
  settlementImages?: string[];
  groupId?: string;
  createdAt?: string;
  updatedAt?: string;
}

const transactionSchema: Schema<ITransaction> = new Schema(
  {
    transactionName: {
      required: true,
      type: String,
    },
    transactionDescription: {
      required: true,
      type: String,
    },
    totalAmount: {
      required: true,
      type: String,
    },
    categoryId: {
      required: false,
      type: String,
    },
    memberAmounts: [memberAmountSchema],
    settlementTime: {
      required: true,
      type: String,
    },
    currencyId: {
      required: false,
      type: String,
    },
    notes: {
      required: false,
      type: String,
    },
    tags: {
      required: false,
      type: [String],
    },

    settlementImages: {
      required: false,
      type: [String],
    },
    groupId: {
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

const TransactionModel = model<ITransaction>('Transaction', transactionSchema);

export default TransactionModel;
