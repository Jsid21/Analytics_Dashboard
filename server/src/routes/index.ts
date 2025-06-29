import { Router } from 'express';
import { loginUser, fetchTransactions, generateTransactionCSV } from '../controllers';

const router = Router();

router.post('/login', loginUser);
router.get('/transactions', fetchTransactions);
router.get('/transactions/csv', generateTransactionCSV);

export default router;