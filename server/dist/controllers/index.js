"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTransactionCSV = exports.fetchTransactions = exports.loginUser = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Logic for user login
});
exports.loginUser = loginUser;
const fetchTransactions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Use process.cwd() to get the project root, then src/transactions.json
        const filePath = path_1.default.join(process.cwd(), 'src', 'transactions.json');
        const data = fs_1.default.readFileSync(filePath, 'utf-8');
        const transactions = JSON.parse(data);
        res.json(transactions);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch transactions', error: error.message });
    }
});
exports.fetchTransactions = fetchTransactions;
const generateTransactionCSV = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Logic for generating CSV reports
});
exports.generateTransactionCSV = generateTransactionCSV;
