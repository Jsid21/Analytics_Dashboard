"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const controllers_1 = require("../controllers");
const router = (0, express_1.Router)();
router.post('/login', controllers_1.loginUser);
router.get('/transactions', controllers_1.fetchTransactions);
router.get('/transactions/csv', controllers_1.generateTransactionCSV);
exports.default = router;
