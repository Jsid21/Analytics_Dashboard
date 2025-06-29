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
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportTransactionsToCSV = exports.getTransactionsForUser = exports.searchTransactions = exports.sortTransactions = exports.filterTransactions = void 0;
const models_1 = require("../models");
const filterTransactions = (transactions, filterCriteria) => {
    // Implement filtering logic based on filterCriteria
};
exports.filterTransactions = filterTransactions;
const sortTransactions = (transactions, sortBy) => {
    // Implement sorting logic based on sortBy
};
exports.sortTransactions = sortTransactions;
const searchTransactions = (transactions, searchTerm) => {
    // Implement search logic based on searchTerm
};
exports.searchTransactions = searchTransactions;
const getTransactionsForUser = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield models_1.Transaction.find({ userId });
});
exports.getTransactionsForUser = getTransactionsForUser;
const exportTransactionsToCSV = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, exports.getTransactionsForUser)(userId);
});
exports.exportTransactionsToCSV = exportTransactionsToCSV;
