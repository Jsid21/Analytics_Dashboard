import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

export const loginUser = async (req: Request, res: Response) => {
  // Logic for user login
};

export const fetchTransactions = async (req: Request, res: Response) => {
  try {
    // Use process.cwd() to get the project root, then src/transactions.json
    const filePath = path.join(process.cwd(), 'src', 'transactions.json');
    const data = fs.readFileSync(filePath, 'utf-8');
    const transactions = JSON.parse(data);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions', error: (error as Error).message });
  }
};

export const generateTransactionCSV = async (req: Request, res: Response) => {
  // Logic for generating CSV reports
};