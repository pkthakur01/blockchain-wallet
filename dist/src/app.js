"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = require("express");
const mongoose_1 = require("mongoose");
const body_parser_1 = require("body-parser");
const blockchain_1 = require("./blockchain");
const MONGODB_URI = 'mongodb://localhost:27017/blockchain-wallet';
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB database');
})
    .catch(error => {
    console.error('MongoDB connection error:', error);
});
const blockchain = new blockchain_1.Blockchain();
const app = (0, express_1);
const port = 3000;
app.use(body_parser_1.json());
app.post('/transaction', (req, res) => {
    const { fromAddress, toAddress, amount } = req.body;
    if (!fromAddress || !toAddress || !amount) {
        return res.status(400).json({ error: 'Missing required parameters.' });
    }
    const transaction = new blockchain_1.Transaction(fromAddress, toAddress, amount);
    blockchain.addTransaction(transaction);
    return res.status(201).json({ message: 'Transaction added successfully.' });
});
app.get('/balance/:address', (req, res) => {
    const address = req.params.address;
    const balance = blockchain.getBalance(address);
    return res.json({ balance });
});
app.get('/transaction-history/:address', (req, res) => {
    const address = req.params.address;
    const transactions = blockchain.getTransactionHistory(address);
    return res.json({ transactions });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
