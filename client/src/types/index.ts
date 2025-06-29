import type { Key, ReactNode } from "react";

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

export interface Transaction {
  type: ReactNode;
  img: string | undefined;
  name: Key | null | undefined;
  status: any;
  user_profile: string;
  id: string;
  userId: string;
  amount: number;
  date: Date;
  description: string;
  category: string;
}