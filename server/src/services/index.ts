import { Transaction } from '../models';
import { User } from '../models';
import { generateTransactionCSV } from '../controllers/index';

export const filterTransactions = (transactions: any, filterCriteria: any) => {
  // Implement filtering logic based on filterCriteria
};

export const sortTransactions = (transactions: any, sortBy: any) => {
  // Implement sorting logic based on sortBy
};

export const searchTransactions = (transactions: any, searchTerm: any) => {
  // Implement search logic based on searchTerm
};

export const getTransactionsForUser = async (userId: any) => {
  return await Transaction.find({ userId });
};

export const exportTransactionsToCSV = async (userId: any) => {
  return await getTransactionsForUser(userId);
};