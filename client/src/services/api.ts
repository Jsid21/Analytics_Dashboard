import axios from 'axios';
import type { User, Transaction } from '../types';

const API_URL = 'http://localhost:5000/api';

export const login = async (email: string, password: string): Promise<User> => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const fetchTransactions = async (): Promise<Transaction[]> => {
  const response = await axios.get(`${API_URL}/transactions`);
  return response.data;
};

export const exportCSV = async (): Promise<void> => {
  const response = await axios.get(`${API_URL}/transactions/export`, {
    responseType: 'blob',
  });
  const url = window.URL.createObjectURL(new Blob([response.data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'transactions.csv');
  document.body.appendChild(link);
  link.click();
  link.remove();
};