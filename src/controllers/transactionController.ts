import { Request, Response } from 'express';
import TransactionModel, { ITransaction } from '../models/transactionModel';

export const createTransaction = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req?.user;
    const {
      transactionName,
      totalAmount,
      memberAmounts,
      transactionDescription,
      categoryId,
      currencyId,
      notes,
      tags,
      settlementTime,
      settlementImages,
      groupId,
    } = req.body as ITransaction;

    // Null check for name
    if (!transactionName || !totalAmount) {
      return res.status(400).json({ status: 400, message: 'Please check the transaction data supplied.' });
    }

    if (!Array.isArray(memberAmounts)) {
      return res.status(400).json({ status: 400, message: 'Please check the members supplied.' });
    }

    const currentDateTime = new Date();
    const newTransaction = new TransactionModel({
      transactionName,
      totalAmount,
      memberAmounts,
      categoryId,
      createdAt: currentDateTime,
      currencyId,
      groupId,
      notes,
      settlementImages,
      settlementTime,
      tags,
      transactionDescription,
      updatedAt: currentDateTime,
      createdByUser: loggedInUser?.userId,
    });

    await newTransaction.save();
    return res.status(201).json({ status: 201, message: 'Transaction created successfully.' });
  } catch (error: any) {
    return res.status(400).json({ message: error?.message });
  }
};
